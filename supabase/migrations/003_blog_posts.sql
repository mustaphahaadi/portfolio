-- ================================================================
-- BLOG POSTS TABLE — Run this in your Supabase SQL Editor
-- ================================================================

create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  content       text,           -- Full Markdown body
  cover_image   text,           -- Optional image URL
  tags          text[],
  category      text,
  read_time     int,            -- Estimated minutes
  is_published  boolean default false,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────────────────
alter table public.blog_posts enable row level security;

-- Allow anyone to read published posts (public portfolio)
create policy "Public: read published posts"
  on public.blog_posts for select
  using (is_published = true);

-- ── Sample Seed Data ────────────────────────────────────────────
insert into public.blog_posts (slug, title, excerpt, category, tags, read_time, is_published, published_at, content)
values (
  'terraform-aws-eks-zero-to-production',
  'Terraform on AWS: Zero to EKS in 30 Minutes',
  'A hands-on walkthrough of provisioning a production-grade EKS cluster using Terraform modules, including VPC design, IAM roles, and node group auto-scaling.',
  'Infrastructure',
  array['Terraform', 'AWS', 'EKS', 'DevOps'],
  12,
  true,
  now(),
  '# Terraform on AWS: Zero to EKS in 30 Minutes

## Introduction

Elastic Kubernetes Service (EKS) is AWS''s managed Kubernetes offering.
Pair it with Terraform and you get infrastructure-as-code you can version, review, and ship like any software artifact.

## Step 1 — VPC Module

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
}
```

## Step 2 — Apply

```bash
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

Posts deployed! 🚀
'
);
