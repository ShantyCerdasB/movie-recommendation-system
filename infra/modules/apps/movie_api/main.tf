resource "aws_ecr_repository" "api" {
  name                 = "${var.name_prefix}-api"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_lifecycle_policy" "api_keep_last_5" {
  repository = aws_ecr_repository.api.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep the five most recent images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 5
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

module "lambda" {
  source = "../../aws/lambda_function"

  function_name      = "${var.name_prefix}-api"
  image_uri          = "${aws_ecr_repository.api.repository_url}:latest"
  timeout            = var.lambda_timeout
  memory_size        = var.lambda_memory_size
  log_retention_days = var.log_retention_days
  environment_variables = merge(
    {
      ASPNETCORE_ENVIRONMENT = "Production"
    },
    var.environment_variables
  )
}

module "api_gateway" {
  source = "../../aws/apigw_http_api"

  name_prefix                = var.name_prefix
  description                = "Movie Recommendation PoC API"
  lambda_function_name       = module.lambda.function_name
  lambda_function_invoke_arn = module.lambda.function_invoke_arn
  cors_allowed_origins       = var.cors_allowed_origins
  log_retention_days         = var.log_retention_days
}
