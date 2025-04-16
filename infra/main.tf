# Create the state backend first (if not exists)
module "state" {
  source = "./modules/state"

  state_bucket_name    = "${var.project_name}-terraform-state"
  dynamodb_table_name  = "${var.project_name}-terraform-locks"
}

# Network module
module "network" {
  source = "./modules/network"

  project_name        = var.project_name
  vpc_cidr            = "10.0.0.0/16"
  public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]
  azs                 = ["eu-north-1a", "eu-north-1b"]
}

# Security module
module "security" {
  source = "./modules/security"

  project_name = var.project_name
  public_key   = var.public_key
  vpc_id       = module.network.vpc_id
}

# Compute module
module "compute" {
  source = "./modules/compute"

  project_name          = var.project_name
  ami_id                = "ami-0c02fb55956c7d316"  # Amazon Linux 2
  instance_type         = "t2.micro"
  key_name              = module.security.key_name
  security_group_id     = module.security.security_group_id
  subnet_id             = module.network.public_subnet_ids[0]
  instance_profile_name = module.security.instance_profile_name
}

