output "bucket_name" {
  description = "Bucket name"
  value       = aws_s3_bucket.bucket.id
}

output "bucket_arn" {
  description = "Bucket ARN"
  value       = aws_s3_bucket.bucket.arn
}
