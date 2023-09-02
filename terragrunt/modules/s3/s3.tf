locals {
  mime_types = jsondecode(file("${path.module}/data/mime.json"))
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.website_bucket_name

  tags = {
    Environment = "${var.env}"
  }
}

resource "aws_s3_bucket_website_configuration" "website_configuration" {
  bucket = aws_s3_bucket.website_bucket.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = templatefile("data/s3-policy.json", { bucket = "${var.website_bucket_name}" })

  depends_on = [aws_s3_bucket_public_access_block.website_public_access]
}

resource "aws_s3_bucket_public_access_block" "website_public_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "website_bucket_ownnership" {
  bucket = aws_s3_bucket.website_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }

  depends_on = [aws_s3_bucket_public_access_block.website_public_access]
}

resource "aws_s3_bucket_acl" "website_bucket_acl" {
  bucket = aws_s3_bucket.website_bucket.id
  acl    = "private"

  depends_on = [aws_s3_bucket_ownership_controls.website_bucket_ownnership]
}

resource "aws_s3_object" "source_code" {
  for_each     = fileset("${var.src_path}", "*")
  bucket       = aws_s3_bucket.website_bucket.id
  key          = each.value
  source       = "${var.src_path}${each.value}"
  etag         = "${filemd5("${var.src_path}${each.value}")}"
  content_type = lookup(local.mime_types, regex("\\.(?P<extension>[A-Za-z0-9]+)$", each.value).extension, "application/octet-stream")
}
