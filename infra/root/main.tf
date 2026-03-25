locals {
  name_prefix     = "${var.project}-${var.env}"
  frontend_domain = var.subdomain != "" ? "${var.subdomain}.${var.domain_name}" : var.domain_name
}
