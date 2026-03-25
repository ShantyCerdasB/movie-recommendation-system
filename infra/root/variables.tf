variable "project" {
  description = "Project name used for resource naming"
  type        = string
}

variable "env" {
  description = "Environment name"
  type        = string

  validation {
    condition     = contains(["qa", "prod"], var.env)
    error_message = "Environment must be either qa or prod."
  }
}

variable "aws_region" {
  description = "Primary AWS region"
  type        = string
  default     = "us-east-2"
}

variable "managed_by" {
  description = "Tag value for ManagedBy"
  type        = string
  default     = "Terraform"
}

variable "owner" {
  description = "Owner or team name"
  type        = string
}

variable "cost_center" {
  description = "Cost center tag"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Root domain name"
  type        = string
}

variable "subdomain" {
  description = "Subdomain for the frontend"
  type        = string
  default     = "movies"
}

variable "use_cloudflare" {
  description = "Create the frontend DNS record in Cloudflare"
  type        = bool
  default     = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for the shared root domain"
  type        = string
  default     = ""
}

variable "enable_cloudflare_worker" {
  description = "Deploy a Cloudflare Worker route for SPA fallback and S3 origin proxying"
  type        = bool
  default     = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID required for Workers"
  type        = string
  default     = ""
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  default     = ""
  sensitive   = true
}

variable "s3_enable_versioning" {
  description = "Enable versioning on the frontend bucket"
  type        = bool
  default     = false
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}

variable "lambda_timeout" {
  description = "Lambda timeout in seconds"
  type        = number
  default     = 30
}

variable "lambda_memory_size" {
  description = "Lambda memory size in MB"
  type        = number
  default     = 512
}

variable "backend_environment_variables" {
  description = "Additional environment variables for the API Lambda"
  type        = map(string)
  default     = {}
}

variable "github_repository" {
  description = "GitHub repository in owner/repo format"
  type        = string
  default     = ""
}

variable "create_github_oidc_provider" {
  description = "Create a GitHub Actions OIDC provider in AWS when no shared provider ARN is supplied"
  type        = bool
  default     = true
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN to reuse across repositories"
  type        = string
  default     = ""
}
