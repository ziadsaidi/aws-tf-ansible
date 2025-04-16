# modules/compute/outputs.tf
output "instance_id" {
  value = aws_instance.todo_server.id
}

output "public_ip" {
  value = aws_instance.todo_server.public_ip
}

output "private_ip" {
  value = aws_instance.todo_server.private_ip
}