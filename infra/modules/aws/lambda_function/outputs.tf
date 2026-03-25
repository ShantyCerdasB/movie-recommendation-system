output "function_name" {
  description = "Lambda function name"
  value       = aws_lambda_function.function.function_name
}

output "function_arn" {
  description = "Lambda function ARN"
  value       = aws_lambda_function.function.arn
}

output "function_invoke_arn" {
  description = "Lambda invoke ARN"
  value       = aws_lambda_function.function.invoke_arn
}
