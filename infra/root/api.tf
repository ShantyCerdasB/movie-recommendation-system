module "movie_api" {
  source = "../modules/apps/movie_api"

  name_prefix           = local.name_prefix
  lambda_timeout        = var.lambda_timeout
  lambda_memory_size    = var.lambda_memory_size
  log_retention_days    = var.log_retention_days
  cors_allowed_origins  = [module.web_site.frontend_url, "http://localhost:5173"]
  environment_variables = var.backend_environment_variables
}
