variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
}

variable "domain_name" {
  description = "Root domain name"
  type        = string
}

variable "subdomain" {
  description = "Frontend subdomain"
  type        = string
  default     = ""
}

variable "use_cloudflare" {
  description = "Manage the frontend DNS record in Cloudflare"
  type        = bool
  default     = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID"
  type        = string
  default     = ""
}

variable "enable_cloudflare_worker" {
  description = "Deploy a Cloudflare Worker route for SPA fallback"
  type        = bool
  default     = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
  default     = ""
}

variable "aws_region" {
  description = "AWS region hosting the S3 bucket"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "managed_by" {
  description = "Managed by tag value"
  type        = string
}

variable "s3_enable_versioning" {
  description = "Enable bucket versioning"
  type        = bool
  default     = false
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}
