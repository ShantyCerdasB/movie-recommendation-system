module "github_oidc" {
  count  = var.github_repository != "" ? 1 : 0
  source = "../modules/aws/github_oidc"

  name_prefix                = local.name_prefix
  environment                = var.env
  github_repository          = var.github_repository
  create_oidc_provider       = var.create_github_oidc_provider
  existing_oidc_provider_arn = var.github_oidc_provider_arn
  web_bucket_name            = module.web_site.web_bucket_name
  lambda_function_arn        = module.movie_api.lambda_function_arn
  ecr_repository_arn         = module.movie_api.ecr_repository_arn
}
