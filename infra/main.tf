

provider "aws" {

  region = "us-east-1"

}

resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = file("~/.ssh/todo_key.pub")
}


resource "aws_security_group" "todo_sg" {

    name = "todo-sg"
    description = "Allow http and ssh"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

       ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

     ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
}


resource "aws_instance" "todo-server" {

  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.todo_sg.id]

  tags = {
    Name = "todo-server"
  }

  user_data = <<-EOF
        #!/bin/bash
        sudo apt update 
        sudo apt install -y nginx
        EOF
}

output "ec2_public_ip" {
  value = aws_instance.todo-server.public_ip
}
