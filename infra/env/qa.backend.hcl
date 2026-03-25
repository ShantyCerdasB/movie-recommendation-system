terraform {
  backend "s3" {
    bucket         = "movie-recommendation-terraform-state-qa"
    key            = "qa/terraform.tfstate"
    region         = "us-east-2"
    encrypt        = true
    dynamodb_table = "movie-recommendation-terraform-locks-qa"
  }
}
