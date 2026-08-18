-- ====================================================================
-- SUPABASE DATABASE SCHEMA & SEED DATA FOR PORTFOLIO WEBSITE
-- ====================================================================
-- Copy and paste this script into your Supabase SQL Editor (SQL Query tab)
-- to create all necessary tables, set up RLS security policies, and seed initial data.
-- This script is fully IDEMPOTENT and safe to run multiple times!

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- 1. TABLES DEFINITION
-- ====================================================================

-- Profile Table
CREATE TABLE IF NOT EXISTS public.profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    roles TEXT[] NOT NULL DEFAULT '{}',
    bio TEXT NOT NULL,
    profile_picture TEXT,
    resume TEXT,
    github_link TEXT,
    linkedin_link TEXT,
    twitter_link TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'fas fa-briefcase',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'fas fa-code',
    github_url TEXT,
    live_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tools / Technologies Table
CREATE TABLE IF NOT EXISTS public.tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'fas fa-cube',
    version TEXT DEFAULT 'latest',
    status TEXT DEFAULT 'installed',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Education Table
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year TEXT NOT NULL,
    institution TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    organization TEXT NOT NULL,
    issue_date TEXT,
    expiration_date TEXT DEFAULT 'No expiration',
    credential_id TEXT,
    credential_url TEXT,
    icon TEXT DEFAULT 'fas fa-certificate',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'fas fa-server',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    text TEXT NOT NULL,
    avatar TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
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

-- ====================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if present (for clean re-runs)
DROP POLICY IF EXISTS "Allow public read access on profile" ON public.profile;
DROP POLICY IF EXISTS "Allow public read access on experiences" ON public.experiences;
DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public read access on tools" ON public.tools;
DROP POLICY IF EXISTS "Allow public read access on education" ON public.education;
DROP POLICY IF EXISTS "Allow public read access on certifications" ON public.certifications;
DROP POLICY IF EXISTS "Allow public read access on services" ON public.services;
DROP POLICY IF EXISTS "Allow public read access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Public: read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated full control on blog_posts" ON public.blog_posts;

DROP POLICY IF EXISTS "Allow authenticated full control on profile" ON public.profile;
DROP POLICY IF EXISTS "Allow authenticated full control on experiences" ON public.experiences;
DROP POLICY IF EXISTS "Allow authenticated full control on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated full control on tools" ON public.tools;
DROP POLICY IF EXISTS "Allow authenticated full control on education" ON public.education;
DROP POLICY IF EXISTS "Allow authenticated full control on certifications" ON public.certifications;
DROP POLICY IF EXISTS "Allow authenticated full control on services" ON public.services;
DROP POLICY IF EXISTS "Allow authenticated full control on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated full control on contact_messages" ON public.contact_messages;

-- Create Public Read Policies for Portfolio Tables
CREATE POLICY "Allow public read access on profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Allow public read access on education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON public.testimonials FOR SELECT USING (true);

-- Create Public Insert Policy for Contact Messages
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Blog Posts: public can read published posts only
CREATE POLICY "Public: read published posts" ON public.blog_posts FOR SELECT USING (is_published = true);

-- Create Admin Full Control Policies for Authenticated Users (Supabase Dashboard / Admin Users)
CREATE POLICY "Allow authenticated full control on profile" ON public.profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on tools" ON public.tools FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on certifications" ON public.certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on contact_messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full control on blog_posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- ====================================================================
-- 3. INITIAL SEED DATA (Only seeded if table is currently empty)
-- ====================================================================

-- Seed Profile
INSERT INTO public.profile (name, roles, bio, profile_picture, github_link, linkedin_link, twitter_link)
SELECT 
    'Mustapha Haadi',
    ARRAY['Cloud & DevOps Engineer', 'AWS Certified Cloud Practitioner', 'Technical Trainer & Educator'],
    'AWS Certified Cloud Practitioner and First-Class Computer Technology graduate with 26+ months of production DevOps experience and 300+ students trained. Owns infrastructure end-to-end, from provisioning and hardening to incident resolution and operational documentation. Proficient in Linux administration, container orchestration, serverless architecture, and Infrastructure as Code.',
    'https://github.com/mustaphahaadi.png',
    'https://www.github.com/mustaphahaadi',
    'https://www.linkedin.com/in/mustaphahaadi',
    'https://www.x.com/mustaphahaadiX'
WHERE NOT EXISTS (SELECT 1 FROM public.profile);

-- Seed Experiences
INSERT INTO public.experiences (company, position, year, description, icon, display_order)
SELECT company, position, year, description, icon, display_order FROM (VALUES
('Azubi Africa / Kumasi (Hybrid)', 'AWS Cloud & AI Intern', 'May 2026 – Present', 'Provisioned EC2, S3, Lambda, and CloudFormation across 4+ team projects in agile sprints. Architected serverless workflows and end-to-end cloud infrastructure using IaC.', 'fab fa-aws', 1),
('ReStartDigital / Kumasi', 'Technical Trainer', 'Dec 2025 – Present', 'Designed two parallel professional tracks (Linux for Cybersecurity and AI for Web Development). Delivered hands-on curricula to 40+ working professionals with 90%+ satisfaction scores.', 'fas fa-chalkboard-teacher', 2),
('ReStartDigital / Kumasi', 'DevOps Engineer', 'Aug 2024 – Apr 2026', 'Operated as sole DevOps engineer owning cloud infrastructure and release pipelines. Slashed deployment steps from 12 to 2 per release via GitHub Actions.', 'fas fa-server', 3),
('IRID, KsTU / Kumasi', 'Technical Support Lead', 'Nov 2025 – Present', 'Led technical support activities by troubleshooting complex systems, resolving user incidents, and maintaining smooth day-to-day technology operations.', 'fas fa-headset', 4)
) AS v(company, position, year, description, icon, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.experiences);

-- Seed Projects
INSERT INTO public.projects (number, title, description, icon, github_url, display_order)
SELECT number, title, description, icon, github_url, display_order FROM (VALUES
('01', 'AlphaAsk: AI-Powered Student Academic Support Platform', 'Engineered serverless backend on AWS API Gateway, Lambda, and DynamoDB with a resilient multi-provider AI fallback chain (Groq → Gemini → Bedrock).', 'fas fa-robot', 'https://github.com/Azubi-Team-Alpha/AlphaAsk', 1),
('02', 'AlphaPass: Serverless Event Ticketing Platform', 'Directed 6-person team building peer-to-peer ticket resale on AWS Lambda, API Gateway, and DynamoDB. Orchestrated Terraform infrastructure modules.', 'fas fa-ticket-alt', 'https://github.com/Azubi-Team-Alpha/event-ticketing--alphapass', 2),
('03', 'AlphaPay: End-to-End Cloud Solution Design', 'Led 6-person team architecting web app infrastructure across EC2, ALB, CloudFront, and Route 53 with automated CI/CD pipelines.', 'fas fa-cloud-upload-alt', 'https://github.com/Azubi-Team-Alpha/end-to-end-cloud-solution-design--alphapay', 3),
('04', 'FastAPI CI/CD Pipeline on AWS EC2', 'Containerised FastAPI application with GitHub Actions automating test, build, push to Docker Hub, and SSH deployment to AWS EC2.', 'fas fa-infinity', 'https://github.com/mustaphahaadi/fastapi-cicd', 4)
) AS v(number, title, description, icon, github_url, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.projects);

-- Seed Tools
INSERT INTO public.tools (name, icon, version, status, display_order)
SELECT name, icon, version, status, display_order FROM (VALUES
('AWS (Cloud)', 'fab fa-aws', 'EC2/S3/Lambda/VPC', 'expert', 1),
('Docker & Swarm', 'fab fa-docker', 'v26.x', 'expert', 2),
('Kubernetes', 'fas fa-dharmachakra', 'v1.29', 'proficient', 3),
('Terraform & IaC', 'fas fa-cubes', 'v1.7.x', 'expert', 4),
('Linux & Bash', 'fab fa-linux', 'Ubuntu/Debian', 'expert', 5),
('GitHub Actions', 'fab fa-github', 'CI/CD Pipelines', 'expert', 6),
('Python (FastAPI/Django)', 'fab fa-python', '3.12+', 'expert', 7),
('PostgreSQL & DynamoDB', 'fas fa-database', 'Relational/NoSQL', 'proficient', 8)
) AS v(name, icon, version, status, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.tools);

-- Seed Education
INSERT INTO public.education (year, institution, description, location, display_order)
SELECT year, institution, description, location, display_order FROM (VALUES
('May 2026 – Present', 'Azubi Africa', 'AWS Cloud Intensive Programme — Hands-on intensive engineering program covering AWS cloud architecture, serverless workflows, IaC, and AI integration.', 'Kumasi, Ghana', 1),
('Aug 2025 – Nov 2025', 'AmaliTech', 'AWS re/Start Programme — Industry certification program covering AWS cloud foundational services, Linux administration, Python scripting, and network security.', 'Ghana', 2),
('Jan 2022 – Oct 2025', 'Kumasi Technical University', 'BTech Computer Technology (First Class Honours) — Specialized in software development, cloud systems, network engineering, and system administration.', 'Kumasi, Ghana', 3)
) AS v(year, institution, description, location, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.education);

-- Seed Certifications
INSERT INTO public.certifications (name, organization, issue_date, expiration_date, credential_url, icon, display_order)
SELECT name, organization, issue_date, expiration_date, credential_url, icon, display_order FROM (VALUES
('AWS Cloud Practitioner (CLF-C02)', 'Amazon Web Services', 'Nov 2025', 'Nov 2028', 'https://aws.amazon.com/certification/certified-cloud-practitioner/', 'fab fa-aws', 1),
('Cisco CyberOps Associate', 'Cisco Networking Academy', 'Feb 2024', 'No expiration', 'https://www.netacad.com/', 'fas fa-shield-alt', 2),
('Docker MasterClass: Compose, Swarm, DevOps', 'Udemy', '2025', 'No expiration', 'https://www.udemy.com/', 'fab fa-docker', 3),
('Virtualisation and Containers', 'KodeKloud', 'Mar 2026', 'No expiration', 'https://kodekloud.com/', 'fas fa-cubes', 4)
) AS v(name, organization, issue_date, expiration_date, credential_url, icon, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.certifications);

-- Seed Services
INSERT INTO public.services (title, description, icon, display_order)
SELECT title, description, icon, display_order FROM (VALUES
('Cloud Infrastructure', 'Designing and managing cloud infrastructure on AWS and GCP. Implementing IaC with Terraform and CloudFormation for reproducible, scalable environments.', 'fas fa-cloud', 1),
('Container Orchestration', 'Building and orchestrating containerized applications with Docker and Kubernetes. Implementing service meshes, auto-scaling, and zero-downtime deployments.', 'fab fa-docker', 2),
('CI/CD Pipeline Engineering', 'Architecting end-to-end CI/CD pipelines with Jenkins, GitHub Actions, and GitLab CI. Automating testing, building, and deployment workflows for rapid delivery.', 'fas fa-code-branch', 3)
) AS v(title, description, icon, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.services);

-- Seed Testimonials
INSERT INTO public.testimonials (name, position, text, avatar, display_order)
SELECT name, position, text, avatar, display_order FROM (VALUES
('Prof. Smart A. Sarpong', 'Director, IRID-KsTU', 'Haadi is one of the very best young guys that worked with me at IRID. He doesn''t talk much but always ready to learn', 'https://randomuser.me/api/portraits/men/1.jpg', 1),
('Hope Nelson Decardi', 'Co-Founder ReStartDigital', 'Haadi is a cool guy. Though he is not technically good than me. But the rare thing about him is that he is always ready to learn and improve himself.', 'https://randomuser.me/api/portraits/men/2.jpg', 2),
('Madam Diana Owusu', 'Register, IRID-KsTU', 'Haadi is a dedicated and hardworking individual. He always strives to deliver the best results and is not afraid to take on challenges.', 'https://randomuser.me/api/portraits/men/3.jpg', 3)
) AS v(name, position, text, avatar, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials);

-- Seed Blog Posts (only if table is empty)
INSERT INTO public.blog_posts (slug, title, excerpt, category, tags, read_time, is_published, published_at, content)
SELECT slug, title, excerpt, category, tags, read_time, is_published, published_at, content FROM (VALUES
(
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

Elastic Kubernetes Service (EKS) is AWS''s managed Kubernetes offering. Pair it with Terraform and you get infrastructure-as-code you can version, review, and ship like any other software artifact.

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
'
)
) AS v(slug, title, excerpt, category, tags, read_time, is_published, published_at, content)
WHERE NOT EXISTS (SELECT 1 FROM public.blog_posts);
