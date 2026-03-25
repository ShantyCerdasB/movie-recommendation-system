output "frontend_domain" {
  description = "Frontend domain name"
  value       = module.web_site.domain_name
}

output "website_url" {
  description = "Frontend URL"
  value       = module.web_site.frontend_url
}

output "web_bucket_name" {
  description = "S3 bucket name for the frontend"
  value       = module.web_site.web_bucket_name
}

output "api_gateway_url" {
  description = "Default API Gateway URL"
  value       = module.movie_api.api_gateway_url
}

output "api_base_url" {
  description = "Base URL consumed by the frontend application"
  value       = "${module.movie_api.api_gateway_url}/v1"
}

output "lambda_function_name" {
  description = "Lambda function name for the API"
  value       = module.movie_api.lambda_function_name
}

output "ecr_repository_url" {
  description = "ECR repository URL for the API image"
  value       = module.movie_api.ecr_repository_url
}

output "github_actions_role_arn" {
  description = "GitHub Actions IAM role ARN"
  value       = var.github_repository != "" ? module.github_oidc[0].role_arn : null
}

output "deploy_config" {
  description = "Configuration consumed by GitHub Actions deploy workflows"
  value = {
    AWS_REGION           = var.aws_region
    WEBSITE_URL          = module.web_site.frontend_url
    S3_BUCKET            = module.web_site.web_bucket_name
    API_GATEWAY_URL      = module.movie_api.api_gateway_url
    VITE_API_URL         = "${module.movie_api.api_gateway_url}/v1"
    LAMBDA_FUNCTION_NAME = module.movie_api.lambda_function_name
    ECR_REPOSITORY_URI   = module.movie_api.ecr_repository_url
  }
}
