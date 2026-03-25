locals {
  full_domain = var.subdomain != "" ? "${var.subdomain}.${var.domain_name}" : var.domain_name
}

module "web_bucket" {
  source = "../../aws/s3_bucket"

  bucket_name       = "${var.name_prefix}-web"
  allow_public_read = var.use_cloudflare
  enable_versioning = var.s3_enable_versioning
}

data "cloudflare_zone" "site" {
  count   = var.use_cloudflare && var.cloudflare_zone_id != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
}

resource "cloudflare_record" "site_cname" {
  count = var.use_cloudflare && var.cloudflare_zone_id != "" ? 1 : 0

  zone_id = data.cloudflare_zone.site[0].id
  name    = var.subdomain != "" ? var.subdomain : "@"
  type    = "CNAME"
  content = "${module.web_bucket.bucket_name}.s3.${var.aws_region}.amazonaws.com"
  proxied = true
  ttl     = 1
}

resource "cloudflare_workers_script" "s3_proxy" {
  count      = var.use_cloudflare && var.cloudflare_zone_id != "" && var.enable_cloudflare_worker ? 1 : 0
  account_id = var.cloudflare_account_id
  name       = "${var.name_prefix}-s3-proxy"
  content    = <<-JS
    const S3_BASE = 'https://${module.web_bucket.bucket_name}.s3.${var.aws_region}.amazonaws.com'
    const CACHE_TTL = 3600

    addEventListener('fetch', event => {
      event.respondWith(handleRequest(event))
    })

    async function handleRequest(event) {
      const request = event.request
      const cache = caches.default
      const url = new URL(request.url)
      let path = url.pathname === '/' || url.pathname === '' ? '/index.html' : url.pathname

      const cacheKey = new Request(new URL(path, url.origin).toString())
      let response = await cache.match(cacheKey)
      if (response) return response

      response = await fetch(S3_BASE + path)

      if (response.status === 403 || response.status === 404) {
        response = await fetch(S3_BASE + '/index.html')
      }

      if (response.ok) {
        const cachedResponse = new Response(response.body, response)
        cachedResponse.headers.set('Cache-Control', 'public, max-age=' + CACHE_TTL)
        event.waitUntil(cache.put(cacheKey, cachedResponse.clone()))
        return cachedResponse
      }

      return response
    }
  JS
}

resource "cloudflare_workers_route" "s3_proxy" {
  count       = var.use_cloudflare && var.cloudflare_zone_id != "" && var.enable_cloudflare_worker ? 1 : 0
  zone_id     = data.cloudflare_zone.site[0].id
  pattern     = "${local.full_domain}/*"
  script_name = cloudflare_workers_script.s3_proxy[0].name
}
