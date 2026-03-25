#!/usr/bin/env bash
set -euo pipefail

if [ -z "${LAMBDA_FUNCTION_NAME:-}" ]; then
  echo "LAMBDA_FUNCTION_NAME is required" >&2
  exit 1
fi

if [ -z "${ECR_REPOSITORY_URI:-}" ]; then
  echo "ECR_REPOSITORY_URI is required" >&2
  exit 1
fi

echo "Logging in to ECR..."
ECR_REGISTRY="${ECR_REPOSITORY_URI%%/*}"
aws ecr get-login-password --region "${AWS_REGION:-us-east-2}" | docker login --username AWS --password-stdin "$ECR_REGISTRY"

echo "Building backend image..."
docker buildx build \
  --platform linux/amd64 \
  --provenance=false \
  --sbom=false \
  --load \
  -t "$ECR_REPOSITORY_URI:latest" \
  backend

echo "Pushing backend image..."
docker push "$ECR_REPOSITORY_URI:latest"

echo "Updating Lambda code..."
aws lambda update-function-code \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --image-uri "$ECR_REPOSITORY_URI:latest" \
  --region "${AWS_REGION:-us-east-2}"

echo "Waiting for Lambda update to finish..."
aws lambda wait function-updated \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --region "${AWS_REGION:-us-east-2}"

echo "Backend deployment completed."
