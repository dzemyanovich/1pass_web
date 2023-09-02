locals {
  env                 = "preprod1"
  aws_region          = "eu-central-1"
  website_bucket_name = "admin.multipass.app"
  src_path            = "${get_parent_terragrunt_dir()}/../../../dist_preprod/"
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
    bucket = "${local.env}.${local.website_bucket_name}-terragrunt"
    region = "${local.aws_region}"
    key    = "${path_relative_to_include()}/terraform.tfstate"
  }

  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}
