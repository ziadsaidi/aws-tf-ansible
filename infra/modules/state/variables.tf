# modules/state/variables.tf
variable "state_bucket_name" {
  description = "Name of the S3 bucket for Terraform state"
  type        = string
  default     = "todo-app-terraform-state-1223378"
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table for Terraform state locking"
  type        = string
  default     = "todo-app-terraform-12223333-locks"
}

