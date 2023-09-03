# Envs

| Env      | URL                                                                         |
| -------- | --------------------------------------------------------------------------- |
| dev      | http://admin.multipass.app.dev1.s3-website.eu-central-1.amazonaws.com/      |
| preprod  | http://admin.multipass.app.preprod1.s3-website.eu-central-1.amazonaws.com/  |
| prod     | http://admin.multipass.app.prod1.s3-website.eu-central-1.amazonaws.com/     |

# Prerequisites
- Node.js 16.20.1
- Terragrunt 0.48.1 (Terraform 1.5.2 is used under the hood). Use `brew` to install
> Terraform / Terragrunt usage is restricted in Belarus. In order to run commands locally from Belarus location, you need to be connected to Europe / USA VPN (sometimes you need to switch between different VPN countries several times). Othewise, you'll see the following error:
```
Error: Invalid provider registry host
The host "registry.terraform.io" given in provider source address "registry.terraform.io/hashicorp/aws" does not offer a Terraform provider registry.
```

# GitLab CI/CD setup
Before running pipeline set the following env vars (variables should be **not protected**):

| Env var                      | Value                | Comments                                              |
| ---------------------------- | -------------------- | ----------------------------------------------------- |
| AWS_ACCESS_KEY_ID            | "some_value"         |                                                       |
| AWS_SECRET_ACCESS_KEY        | "some_value"         |                                                       |

# Local setup

To enable husky pre-push, run once: ```npx husky install```
