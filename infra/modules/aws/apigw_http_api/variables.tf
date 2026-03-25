variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
}

variable "description" {
  description = "API description"
  type        = string
  default     = "Movie Recommendation API"
}

variable "lambda_function_name" {
  description = "Lambda function name"
  type        = string
}

variable "lambda_function_invoke_arn" {
  description = "Lambda invoke ARN"
  type        = string
}

variable "cors_allowed_origins" {
  description = "Allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}
