# backend.tf - Initialize without remote state first, then apply with backend
terraform {
  backend "s3" {
    bucket         = "todo-app-terraform-state"  # This must match the bucket name in the state module
    key            = "terraform.tfstate"
    region         = "eu-north-1"
    encrypt        = true
    dynamodb_table = "todo-app-terraform-locks"  # For state locking
  }
}