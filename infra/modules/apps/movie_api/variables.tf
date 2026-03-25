variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
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

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}

variable "cors_allowed_origins" {
  description = "Allowed origins for API Gateway CORS"
  type        = list(string)
  default     = ["*"]
}

variable "environment_variables" {
  description = "Additional Lambda environment variables"
  type        = map(string)
  default     = {}
}
