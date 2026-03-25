variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "allow_public_read" {
  description = "Allow public read access to objects in the bucket"
  type        = bool
  default     = false
}

variable "enable_versioning" {
  description = "Enable versioning on the bucket"
  type        = bool
  default     = false
}
