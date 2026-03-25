output "web_bucket_name" {
  description = "Frontend S3 bucket name"
  value       = module.web_bucket.bucket_name
}

output "domain_name" {
  description = "Frontend domain name"
  value       = var.subdomain != "" ? "${var.subdomain}.${var.domain_name}" : var.domain_name
}

output "frontend_url" {
  description = "Frontend URL"
  value       = "https://${var.subdomain != "" ? "${var.subdomain}.${var.domain_name}" : var.domain_name}"
}
