locals {
  global_vars         = (read_terragrunt_config(find_in_parent_folders("global.hcl"))).locals
  env                 = "dev1"
  aws_region          = local.global_vars.aws_region
  production_domain   = local.global_vars.production_domain
  src_path            = "${get_parent_terragrunt_dir()}/../../../dist_dev/"
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "skip"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
}
EOF
}

remote_state {
  backend = "s3"
  config = {
    bucket = "${local.production_domain}-${local.env}-terragrunt"
    region = "${local.aws_region}"
    key    = "${path_relative_to_include()}/terraform.tfstate"
  }

  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}
