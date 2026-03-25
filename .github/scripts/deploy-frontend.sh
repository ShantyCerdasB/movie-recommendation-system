#!/usr/bin/env bash
set -euo pipefail

cd frontend

echo "Installing frontend dependencies..."
npm ci

echo "Building frontend..."
VITE_API_URL="${VITE_API_URL:?VITE_API_URL not set}" npm run build

echo "Syncing frontend to S3..."
aws s3 sync dist/ "s3://${S3_BUCKET:?S3_BUCKET not set}/" --delete

echo "Frontend deployment completed."
