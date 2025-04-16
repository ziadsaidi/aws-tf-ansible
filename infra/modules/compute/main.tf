# modules/compute/main.tf
resource "aws_instance" "todo_server" {
  ami                     = var.ami_id
  instance_type           = var.instance_type
  key_name                = var.key_name
  vpc_security_group_ids  = [var.security_group_id]
  subnet_id               = var.subnet_id
  iam_instance_profile    = var.instance_profile_name
  associate_public_ip_address = true

  tags = {
    Name = "${var.project_name}-server"
  }

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }

  user_data = <<-EOF
              #!/bin/bash
              # Update system packages
              yum update -y
              
              # Install SSM agent
              yum install -y amazon-ssm-agent
              systemctl enable amazon-ssm-agent
              systemctl start amazon-ssm-agent
              
              # Install Python 3.8
              amazon-linux-extras enable python3.8
              yum clean metadata
              yum install -y python3.8

              # Create symlinks to override python3 and pip3
              alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
              alternatives --install /usr/bin/pip3 pip3 /usr/bin/pip3.8 1

              # Make python3.8 default (simplest stable upgrade from 3.7)
              alternatives --set python3 /usr/bin/python3.8
              alternatives --set pip3 /usr/bin/pip3.8

              # Install Docker
              amazon-linux-extras install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user
              
              # Install Git
              yum install -y git

              # Verify versions
              python3 --version
              pip3 --version
              EOF
}

