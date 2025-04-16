# modules/security/variables.tf
variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "todo-app"
}

variable "public_key" {
  description = "Public key for SSH access"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}
