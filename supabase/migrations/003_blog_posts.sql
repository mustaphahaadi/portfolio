-- ================================================================
-- BLOG POSTS — FIX MIGRATION
-- Drops the partially-created table and recreates it cleanly.
-- Safe to run multiple times.
-- ================================================================

DROP TABLE IF EXISTS public.blog_posts CASCADE;

CREATE TABLE public.blog_posts (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug          TEXT UNIQUE NOT NULL,
    title         TEXT NOT NULL,
    excerpt       TEXT,
    content       TEXT,
    cover_image   TEXT,
    tags          TEXT[],
    category      TEXT,
    read_time     INT,
    is_published  BOOLEAN DEFAULT false,
    published_at  TIMESTAMP WITH TIME ZONE,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ── Row Level Security ──────────────────────────────────────────
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public: read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated full control on blog_posts" ON public.blog_posts;

-- Anyone can read published posts (public portfolio)
CREATE POLICY "Public: read published posts"
    ON public.blog_posts FOR SELECT
    USING (is_published = true);

-- Authenticated users (you, via Supabase dashboard) have full control
CREATE POLICY "Allow authenticated full control on blog_posts"
    ON public.blog_posts FOR ALL
    USING (auth.role() = 'authenticated');

-- ── Seed: one starter post ──────────────────────────────────────
INSERT INTO public.blog_posts (slug, title, excerpt, category, tags, read_time, is_published, published_at, content)
VALUES (
  'terraform-aws-eks-zero-to-production',
  'Terraform on AWS: Zero to EKS in 30 Minutes',
  'A hands-on walkthrough of provisioning a production-grade EKS cluster using Terraform modules, including VPC design, IAM roles, and node group auto-scaling.',
  'Infrastructure',
  ARRAY['Terraform', 'AWS', 'EKS', 'DevOps'],
  12,
  true,
  timezone('utc'::text, now()),
  '# Terraform on AWS: Zero to EKS in 30 Minutes

## Introduction

Elastic Kubernetes Service (EKS) is AWS''s managed Kubernetes offering.
Pair it with Terraform and you get infrastructure-as-code you can version, review, and ship like any other software artifact.

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

## Connecting kubectl

```bash
aws eks --region eu-west-1 update-kubeconfig --name my-eks
kubectl get nodes
```

## Summary

| Step | Resource | Time |
| :--- | :--- | :--- |
| VPC | 3 AZs, NAT gateway | ~2 min |
| EKS Cluster | Control plane | ~12 min |
| Node Group | 2× t3.medium | ~4 min |

With Terraform modules you can iterate on this cluster in CI/CD just like application code — plan in PRs, apply on merge.
'
);
