include {
  path = find_in_parent_folders()
}

terraform {
  source = "../../..//modules/s3"
}

locals {
  env_vars = (read_terragrunt_config(find_in_parent_folders("terragrunt.hcl"))).locals
}

inputs = {
  env                 = local.env_vars.env
  website_bucket_name = "${local.env_vars.production_domain}.${local.env_vars.env}"
  src_path            = local.env_vars.src_path
}
