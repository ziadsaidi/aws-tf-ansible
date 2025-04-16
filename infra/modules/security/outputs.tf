# modules/security/outputs.tf
output "key_name" {
  value = aws_key_pair.deployer.key_name
}

output "security_group_id" {
  value = aws_security_group.todo_sg.id
}

output "instance_profile_name" {
  value = aws_iam_instance_profile.todo_app_profile.name
}

output "instance_profile_arn" {
  value = aws_iam_instance_profile.todo_app_profile.arn
}