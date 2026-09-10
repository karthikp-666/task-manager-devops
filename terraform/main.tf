resource "aws_instance" "task_manager" {

  ami           = "ami-xxxxxxxxxxxxxxxxx"
  instance_type = var.instance_type

  tags = {
    Name        = "task-manager-devops"
    Environment = "dev"
  }
}