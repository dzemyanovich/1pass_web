include {
  path = find_in_parent_folders()
}

terraform {
  source = "../../..//modules/s3"
}

locals {
  global_vars = (read_terragrunt_config(find_in_parent_folders("terragrunt.hcl"))).locals
}

inputs = {
  website_bucket_name = "${local.global_vars.env}.${local.global_vars.website_bucket_name}"
  env                 = local.global_vars.env
  src_path            = local.global_vars.src_path
}
