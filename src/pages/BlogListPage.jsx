import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "../services/api";

/* ── Fallback posts shown when Supabase is not configured ── */
const FALLBACK_POSTS = [
  {
    id: "1",
    slug: "terraform-aws-eks-zero-to-production",
    title: "Terraform on AWS: Zero to EKS in 30 Minutes",
    excerpt:
      "A hands-on walkthrough of provisioning a production-grade EKS cluster using Terraform modules, including VPC design, IAM roles, and node group auto-scaling.",
    tags: ["Terraform", "AWS", "EKS", "DevOps"],
    category: "Infrastructure",
    read_time: 12,
    published_at: "2026-08-10T10:00:00Z",
  },
  {
    id: "2",
    slug: "github-actions-docker-cicd-pipeline",
    title: "GitHub Actions × Docker: The CI/CD Pipeline You Actually Need",
    excerpt:
      "Step-by-step guide to building a CI/CD pipeline that tests, builds a Docker image, pushes to Docker Hub, and deploys to an EC2 instance over SSH — with rollback hooks.",
    tags: ["GitHub Actions", "Docker", "CI/CD", "EC2"],
    category: "DevOps",
    read_time: 9,
    published_at: "2026-07-28T08:00:00Z",
  },
  {
    id: "3",
    slug: "aws-lambda-serverless-api-patterns",
    title: "Serverless API Patterns on AWS Lambda You Should Know",
    excerpt:
      "Exploring the most battle-tested design patterns for serverless APIs: multi-provider AI fallback chains, idempotency keys, cold start mitigation, and observability.",
    tags: ["Lambda", "AWS", "Serverless", "API"],
    category: "Architecture",
    read_time: 15,
    published_at: "2026-07-15T09:30:00Z",
  },
  {
    id: "4",
    slug: "supabase-rls-security-guide",
    title: "Row Level Security in Supabase: A Practical Guide",
    excerpt:
      "RLS is the single most important Supabase feature most developers ignore. This guide covers real-world policy patterns for multi-tenant apps, public portfolios, and more.",
    tags: ["Supabase", "PostgreSQL", "Security", "RLS"],
    category: "Database",
    read_time: 8,
    published_at: "2026-06-30T14:00:00Z",
  },
  {
    id: "5",
    slug: "cloud-cost-optimization-checklist",
    title: "AWS Cost Optimization: The 20-Point Checklist",
    excerpt:
      "A practical, no-nonsense checklist for cutting your AWS bill — from right-sizing EC2 instances and S3 lifecycle rules to Spot instances and Reserved Capacity planning.",
    tags: ["AWS", "FinOps", "Cost Optimization"],
    category: "Cloud",
    read_time: 11,
    published_at: "2026-06-12T11:00:00Z",
  },
];

const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CATEGORY_COLORS = {
  Infrastructure: "var(--term-cyan)",
  DevOps:         "var(--term-green)",
  Architecture:   "var(--term-amber)",
  Database:       "#a78bfa",
  Cloud:          "var(--term-cyan-dim)",
};

const BlogListPage = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const res = await getBlogPosts();
      return res.data;
    },
  });

  const posts = postsData || FALLBACK_POSTS;

  /* Derived filters */
  const allTags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags || []))].sort(),
    [posts]
  );
  const allCategories = useMemo(
    () => [...new Set(posts.map((p) => p.category).filter(Boolean))].sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || p.tags?.includes(activeTag);
      const matchesCategory = !activeCategory || p.category === activeCategory;
      return matchesSearch && matchesTag && matchesCategory;
    });
  }, [posts, search, activeTag, activeCategory]);

  return (
    <main
      id="blog"
      style={{
        minHeight: "100vh",
        padding: "80px 16px 60px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "var(--term-font)",
      }}
    >
      {/* ── Terminal Header ── */}
      <div className="mb-8">
        <div style={{ color: "var(--term-gray)", fontSize: "0.75rem", marginBottom: "6px" }}>
          <span style={{ color: "var(--term-cyan)" }}>haadi@cloud</span>
          <span style={{ color: "var(--term-gray)" }}>:</span>
          <span style={{ color: "var(--term-amber)" }}>~/blog</span>
          <span style={{ color: "var(--term-green)" }}> $</span>
        </div>
        <div style={{ color: "var(--term-gray)", fontSize: "0.8rem", marginBottom: "16px" }}>
          <span style={{ color: "var(--term-cyan)" }}>$</span>{" "}
          <span style={{ color: "var(--term-green)" }}>ls -la ./posts/ --sort=date</span>
        </div>
        <h1
          className="glow-green"
          style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--term-green)", marginBottom: "4px" }}
        >
          ./blog
        </h1>
        <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
          {isLoading ? "Loading posts..." : `${filtered.length} post${filtered.length !== 1 ? "s" : ""} found`}
          {!postsData && !isLoading && (
            <span style={{ color: "var(--term-amber)", marginLeft: "12px" }}>
              [offline mode — connect Supabase to manage posts]
            </span>
          )}
        </p>
      </div>

      {/* ── Search ── */}
      <div
        className="mb-6"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--term-bg-card)",
          border: "1px solid var(--term-border)",
          borderRadius: "4px",
          padding: "8px 14px",
        }}
      >
        <span style={{ color: "var(--term-cyan)", fontSize: "0.8rem" }}>$</span>
        <span style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>grep -r </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='"your search term" ./posts/'
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--term-white)",
            fontFamily: "var(--term-font)",
            fontSize: "0.8rem",
            caretColor: "var(--term-green)",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{ background: "none", border: "none", color: "var(--term-gray)", cursor: "pointer", fontSize: "0.75rem" }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {/* ── Category Filter ── */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              style={{
                fontFamily: "var(--term-font)",
                fontSize: "0.7rem",
                padding: "3px 10px",
                borderRadius: "2px",
                border: `1px solid ${activeCategory === cat ? CATEGORY_COLORS[cat] || "var(--term-green)" : "var(--term-border)"}`,
                background: activeCategory === cat ? "rgba(0,255,65,0.06)" : "transparent",
                color: activeCategory === cat ? CATEGORY_COLORS[cat] || "var(--term-green)" : "var(--term-gray)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Tag Filter ── */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              style={{
                fontFamily: "var(--term-font)",
                fontSize: "0.65rem",
                padding: "2px 8px",
                borderRadius: "2px",
                border: `1px solid ${activeTag === tag ? "var(--term-amber-dim)" : "var(--term-gray-dim)"}`,
                background: activeTag === tag ? "rgba(255,184,0,0.08)" : "transparent",
                color: activeTag === tag ? "var(--term-amber)" : "var(--term-gray)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              [{tag}]
            </button>
          ))}
        </div>
      )}

      {/* ── Posts List ── */}
      {isLoading ? (
        <div className="text-center py-12" style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
          <i className="fas fa-spinner fa-spin mr-2" style={{ color: "var(--term-green)" }}></i>
          Fetching posts...
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            padding: "24px",
            border: "1px solid var(--term-border)",
            borderRadius: "4px",
            color: "var(--term-gray)",
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          <span style={{ color: "var(--term-red)" }}>bash: no match</span> — no posts found for{" "}
          <span style={{ color: "var(--term-amber)" }}>"{search}"</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  background: "var(--term-bg-card)",
                  border: "1px solid var(--term-border)",
                  borderRadius: "6px",
                  padding: "20px 24px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--term-green-dim)";
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(0,255,65,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--term-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span style={{ color: "var(--term-green-dim)", fontSize: "0.65rem", fontWeight: "600" }}>
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    {post.category && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: CATEGORY_COLORS[post.category] || "var(--term-cyan)",
                          border: `1px solid ${CATEGORY_COLORS[post.category] || "var(--term-cyan-dim)"}`,
                          padding: "1px 7px",
                          borderRadius: "2px",
                        }}
                      >
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3"
                    style={{ color: "var(--term-gray)", fontSize: "0.65rem" }}
                  >
                    {post.read_time && (
                      <span>
                        <i className="fas fa-clock" style={{ marginRight: "4px" }}></i>
                        {post.read_time} min
                      </span>
                    )}
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  style={{
                    color: "var(--term-white)",
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "8px",
                    lineHeight: "1.5",
                  }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p
                    style={{
                      color: "var(--term-gray)",
                      fontSize: "0.8rem",
                      lineHeight: "1.6",
                      marginBottom: "12px",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--term-amber)",
                          background: "rgba(255,184,0,0.06)",
                          border: "1px solid rgba(255,184,0,0.2)",
                          padding: "1px 7px",
                          borderRadius: "2px",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read more */}
                <div
                  className="flex items-center gap-1 mt-3"
                  style={{ color: "var(--term-green-dim)", fontSize: "0.72rem" }}
                >
                  <span style={{ color: "var(--term-cyan)" }}>$</span>
                  <span>cat ./posts/{post.slug}.md</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: "0.6rem", marginLeft: "4px" }}></i>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default BlogListPage;
