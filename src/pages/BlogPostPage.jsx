import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getBlogPost } from "../services/api";

/* ── Fallback post content (shown without Supabase) ── */
const FALLBACK_POST = {
  slug: "terraform-aws-eks-zero-to-production",
  title: "Terraform on AWS: Zero to EKS in 30 Minutes",
  excerpt:
    "A hands-on walkthrough of provisioning a production-grade EKS cluster using Terraform modules.",
  tags: ["Terraform", "AWS", "EKS", "DevOps"],
  category: "Infrastructure",
  read_time: 12,
  published_at: "2026-08-10T10:00:00Z",
  content: `# Terraform on AWS: Zero to EKS in 30 Minutes

## Introduction

Elastic Kubernetes Service (EKS) is AWS's managed Kubernetes offering. 
Pair it with Terraform and you get infrastructure-as-code that you can 
version, review, and ship like any other software artifact.

## Prerequisites

- AWS CLI configured (\`aws configure\`)
- Terraform ≥ 1.6
- \`kubectl\` installed
- An AWS account with sufficient IAM permissions

## Step 1 — VPC Module

\`\`\`hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    "kubernetes.io/cluster/my-eks" = "shared"
  }
}
\`\`\`

## Step 2 — EKS Cluster Module

\`\`\`hcl
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.0.0"

  cluster_name    = "my-eks"
  cluster_version = "1.29"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    general = {
      min_size     = 1
      max_size     = 3
      desired_size = 2
      instance_types = ["t3.medium"]
    }
  }
}
\`\`\`

## Step 3 — Apply

\`\`\`bash
terraform init
terraform plan -out=tfplan
terraform apply tfplan
\`\`\`

## Connecting kubectl

\`\`\`bash
aws eks --region eu-west-1 update-kubeconfig --name my-eks
kubectl get nodes
\`\`\`

## Summary

| Step | Resource | Time |
| :--- | :--- | :--- |
| VPC | 3 AZs, NAT gateway | ~2 min |
| EKS Cluster | Control plane | ~12 min |
| Node Group | 2× t3.medium | ~4 min |

With Terraform modules you can iterate on this cluster definition in CI/CD 
just like application code — plan in PRs, apply on merge.
`,
};

const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ── Extract headings from markdown for ToC ── */
const extractHeadings = (markdown) => {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  return lines
    .filter((l) => /^#{1,3} /.test(l))
    .map((l) => {
      const level = l.match(/^(#+)/)[1].length;
      const text = l.replace(/^#+\s*/, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { level, text, id };
    });
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [readProgress, setReadProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");

  /* Reading progress bar */
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      setReadProgress(Math.min(100, (scrolled / total) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data: postData, isLoading, isError } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const res = await getBlogPost(slug);
      return res.data;
    },
  });

  const post = postData || (slug === FALLBACK_POST.slug ? FALLBACK_POST : null);
  const headings = extractHeadings(post?.content);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--term-font)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <i className="fas fa-spinner fa-spin" style={{ color: "var(--term-green)", fontSize: "1.5rem" }}></i>
          <p style={{ color: "var(--term-gray)", marginTop: "12px", fontSize: "0.8rem" }}>
            <span style={{ color: "var(--term-cyan)" }}>$</span> cat ./posts/{slug}.md
          </p>
        </div>
      </div>
    );
  }

  if (!post || isError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--term-font)",
          padding: "60px 16px",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ color: "var(--term-red)", fontSize: "1rem", marginBottom: "8px" }}>
            bash: ./posts/{slug}.md: No such file or directory
          </p>
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem", marginBottom: "24px" }}>
            This post doesn't exist or hasn't been published yet.
          </p>
          <Link to="/blog" className="terminal-btn" style={{ textDecoration: "none" }}>
            <span style={{ color: "var(--term-cyan)" }}>$</span>
            <span>cd ../blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Reading Progress Bar ── */}
      <div
        style={{
          position: "fixed",
          top: "56px",
          left: 0,
          width: `${readProgress}%`,
          height: "2px",
          background: "var(--term-green)",
          zIndex: 100,
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(0,255,65,0.5)",
        }}
      />

      <div
        ref={contentRef}
        style={{
          minHeight: "100vh",
          padding: "80px 16px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "32px",
          fontFamily: "var(--term-font)",
        }}
        className="lg:grid-cols-[1fr_240px] blog-post-layout"
      >
        {/* ── Main Content ── */}
        <article style={{ minWidth: 0 }}>
          {/* Back nav */}
          <div className="mb-6">
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--term-gray)",
                textDecoration: "none",
                fontSize: "0.75rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--term-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--term-gray)")}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: "0.65rem" }}></i>
              <span style={{ color: "var(--term-cyan)" }}>$</span>
              <span>cd ../blog</span>
            </Link>
          </div>

          {/* Header */}
          <header
            style={{
              padding: "24px",
              background: "var(--term-bg-card)",
              border: "1px solid var(--term-border)",
              borderRadius: "6px",
              marginBottom: "24px",
            }}
          >
            {/* Terminal titlebar */}
            <div className="flex items-center gap-2 mb-4">
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57", display: "inline-block" }}></span>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840", display: "inline-block" }}></span>
              <span style={{ marginLeft: "8px", color: "var(--term-gray)", fontSize: "0.7rem" }}>
                ~/blog/{slug}.md
              </span>
            </div>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--term-cyan)",
                    border: "1px solid var(--term-cyan-dim)",
                    padding: "2px 8px",
                    borderRadius: "2px",
                  }}
                >
                  {post.category}
                </span>
              )}
              {post.read_time && (
                <span style={{ fontSize: "0.7rem", color: "var(--term-gray)" }}>
                  <i className="fas fa-clock" style={{ marginRight: "4px" }}></i>
                  {post.read_time} min read
                </span>
              )}
              <span style={{ fontSize: "0.7rem", color: "var(--term-gray)" }}>
                <i className="fas fa-calendar" style={{ marginRight: "4px" }}></i>
                {formatDate(post.published_at)}
              </span>
            </div>

            <h1
              className="glow-green"
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--term-white)",
                lineHeight: "1.4",
                marginBottom: "12px",
              }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p style={{ color: "var(--term-gray)", fontSize: "0.85rem", lineHeight: "1.6" }}>
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--term-amber)",
                      background: "rgba(255,184,0,0.06)",
                      border: "1px solid rgba(255,184,0,0.2)",
                      padding: "2px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Markdown Body */}
          {post.content ? (
            <div
              style={{
                background: "var(--term-bg-card)",
                border: "1px solid var(--term-border)",
                borderRadius: "6px",
                padding: "32px",
              }}
            >
              <div className="blog-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "32px",
                background: "var(--term-bg-card)",
                border: "1px solid var(--term-border)",
                borderRadius: "6px",
                color: "var(--term-gray)",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              <i className="fas fa-file-alt" style={{ color: "var(--term-green-dim)", fontSize: "2rem", marginBottom: "12px", display: "block" }}></i>
              No content yet. Add the <code>content</code> field in your Supabase <code>blog_posts</code> table.
            </div>
          )}

          {/* Footer nav */}
          <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
            <Link
              to="/blog"
              className="terminal-btn"
              style={{ textDecoration: "none" }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: "0.7rem" }}></i>
              <span>ls ./blog/</span>
            </Link>
            <Link
              to="#contact"
              onClick={() => navigate("/#contact")}
              className="terminal-btn amber"
              style={{ textDecoration: "none" }}
            >
              <span>hire_me --now</span>
              <i className="fas fa-arrow-right" style={{ fontSize: "0.7rem" }}></i>
            </Link>
          </div>
        </article>

        {/* ── Table of Contents ── */}
        {headings.length > 0 && (
          <aside
            style={{
              position: "sticky",
              top: "80px",
              alignSelf: "start",
              background: "var(--term-bg-card)",
              border: "1px solid var(--term-border)",
              borderRadius: "6px",
              padding: "16px",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
            }}
            className="hidden lg:block"
          >
            <div style={{ color: "var(--term-gray)", fontSize: "0.7rem", marginBottom: "10px" }}>
              <span style={{ color: "var(--term-cyan)" }}>$</span> grep -n "^#" {slug}.md
            </div>
            <nav>
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  style={{
                    display: "block",
                    padding: `4px 0 4px ${(h.level - 1) * 12}px`,
                    color: activeHeading === h.id ? "var(--term-green)" : "var(--term-gray)",
                    fontSize: "0.72rem",
                    textDecoration: "none",
                    lineHeight: "1.5",
                    borderLeft: activeHeading === h.id ? "2px solid var(--term-green)" : "2px solid transparent",
                    paddingLeft: `${8 + (h.level - 1) * 12}px`,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--term-green)")}
                  onMouseLeave={(e) => {
                    if (activeHeading !== h.id)
                      e.currentTarget.style.color = "var(--term-gray)";
                  }}
                  onClick={() => setActiveHeading(h.id)}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>

      {/* ── Blog-specific styles ── */}
      <style>{`
        .blog-post-layout {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .blog-post-layout {
            grid-template-columns: 1fr 240px;
          }
        }
        .blog-markdown h1, .blog-markdown h2, .blog-markdown h3 {
          color: var(--term-green);
          font-family: var(--term-font);
          margin-top: 1.8em;
          margin-bottom: 0.6em;
          line-height: 1.35;
        }
        .blog-markdown h1 { font-size: 1.4rem; border-bottom: 1px solid var(--term-border); padding-bottom: 8px; }
        .blog-markdown h2 { font-size: 1.15rem; }
        .blog-markdown h3 { font-size: 1rem; color: var(--term-cyan); }
        .blog-markdown p {
          color: var(--term-white);
          font-size: 0.88rem;
          line-height: 1.8;
          margin-bottom: 1.2em;
        }
        .blog-markdown ul, .blog-markdown ol {
          color: var(--term-white);
          font-size: 0.88rem;
          line-height: 1.8;
          padding-left: 1.5em;
          margin-bottom: 1.2em;
        }
        .blog-markdown li { margin-bottom: 4px; }
        .blog-markdown code {
          font-family: var(--term-font);
          font-size: 0.82rem;
          color: var(--term-amber);
          background: rgba(255,184,0,0.08);
          border: 1px solid rgba(255,184,0,0.15);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .blog-markdown pre {
          background: #060d06 !important;
          border: 1px solid var(--term-border);
          border-radius: 4px;
          padding: 16px;
          overflow-x: auto;
          margin-bottom: 1.4em;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        .blog-markdown pre code {
          background: none;
          border: none;
          padding: 0;
          color: var(--term-white);
          font-size: 0.82rem;
        }
        .blog-markdown blockquote {
          border-left: 3px solid var(--term-cyan-dim);
          padding: 8px 16px;
          margin: 1em 0;
          color: var(--term-gray);
          font-style: italic;
          background: rgba(0,212,255,0.03);
        }
        .blog-markdown table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.4em;
          font-size: 0.82rem;
        }
        .blog-markdown th {
          color: var(--term-green);
          border-bottom: 1px solid var(--term-border);
          padding: 8px 12px;
          text-align: left;
        }
        .blog-markdown td {
          color: var(--term-white);
          border-bottom: 1px solid var(--term-gray-dim);
          padding: 8px 12px;
        }
        .blog-markdown a {
          color: var(--term-cyan);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-markdown a:hover { color: var(--term-green); }
        .blog-markdown hr {
          border: none;
          border-top: 1px solid var(--term-border);
          margin: 2em 0;
        }
        .blog-markdown strong { color: var(--term-amber); font-weight: 600; }
      `}</style>
    </>
  );
};

export default BlogPostPage;
