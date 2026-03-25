# Movie Recommendation Infrastructure

Terraform infrastructure for the Movie Recommendation System PoC.

## Architecture

- Static frontend hosted in S3
- Cloudflare DNS record and Worker route for SPA delivery
- .NET 8 API packaged as a Lambda container image in ECR
- API Gateway HTTP API using the default execute-api domain
- GitHub Actions deployment through AWS OIDC

## Layout

```text
infra/
├── env/
│   ├── qa.backend.hcl
│   ├── qa.tfvars
│   ├── prod.backend.hcl
│   └── prod.tfvars
├── modules/
│   ├── apps/
│   │   ├── movie_api/
│   │   └── web_site/
│   └── aws/
│       ├── apigw_http_api/
│       ├── github_oidc/
│       ├── lambda_function/
│       └── s3_bucket/
└── root/
    ├── api.tf
    ├── cicd.tf
    ├── main.tf
    ├── outputs.tf
    ├── providers.tf
    ├── variables.tf
    ├── versions.tf
    └── web.tf
```

## Deployment Model

- `qa` and `prod` use separate Terraform backends
- the web app owns only its own subdomain record
- the API uses the default API Gateway domain
- GitHub Actions builds and deploys frontend and backend independently

## Before the First Apply

1. Create the S3 bucket and DynamoDB table used by the Terraform backend
2. Update `env/*.backend.hcl`
3. Update `env/*.tfvars`
4. Export `CLOUDFLARE_API_TOKEN`
5. Run Terraform from `infra/root`

## Typical Workflow

```bash
cd infra/root
terraform init -backend-config=../env/qa.backend.hcl
terraform plan -var-file=../env/qa.tfvars
terraform apply -var-file=../env/qa.tfvars
```

## GitHub Actions

After `terraform apply`, use the `deploy_config` output and the GitHub role ARN outputs:

- `AWS_ROLE_ARN_QA`
- `DEPLOY_QA_CONFIG`

The workflow uses OIDC and does not require long-lived AWS access keys.
