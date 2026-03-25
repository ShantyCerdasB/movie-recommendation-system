module "web_site" {
  source = "../modules/apps/web_site"

  name_prefix              = local.name_prefix
  domain_name              = var.domain_name
  subdomain                = var.subdomain
  use_cloudflare           = var.use_cloudflare
  cloudflare_zone_id       = var.cloudflare_zone_id
  enable_cloudflare_worker = var.enable_cloudflare_worker
  cloudflare_account_id    = var.cloudflare_account_id
  aws_region               = var.aws_region
  environment              = var.env
  managed_by               = var.managed_by
  s3_enable_versioning     = var.s3_enable_versioning
  log_retention_days       = var.log_retention_days
}
