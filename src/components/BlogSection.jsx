import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "../services/api";

const FALLBACK_POSTS = [
  {
    id: "1",
    slug: "terraform-aws-eks-zero-to-production",
    title: "Terraform on AWS: Zero to EKS in 30 Minutes",
    tags: ["Terraform", "AWS", "EKS"],
    read_time: 12,
    published_at: "2026-08-10T10:00:00Z",
  },
  {
    id: "2",
    slug: "github-actions-docker-cicd-pipeline",
    title: "GitHub Actions × Docker: The CI/CD Pipeline You Actually Need",
    tags: ["GitHub Actions", "Docker", "CI/CD"],
    read_time: 9,
    published_at: "2026-07-28T08:00:00Z",
  },
  {
    id: "3",
    slug: "aws-lambda-serverless-api-patterns",
    title: "Serverless API Patterns on AWS Lambda You Should Know",
    tags: ["Lambda", "AWS", "Serverless"],
    read_time: 15,
    published_at: "2026-07-15T09:30:00Z",
  },
];

const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BlogSection = () => {
  const { data: postsData } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const res = await getBlogPosts();
      return res.data;
    },
  });

  const posts = (postsData || FALLBACK_POSTS).slice(0, 3);

  return (
    <section
      id="blog-preview"
      style={{
        padding: "60px 16px",
        fontFamily: "var(--term-font)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Section Header */}
      <div className="mb-6">
        <div style={{ color: "var(--term-gray)", fontSize: "0.75rem", marginBottom: "6px" }}>
          <span style={{ color: "var(--term-cyan)" }}>$</span>{" "}
          <span style={{ color: "var(--term-green)" }}>tail -n 3 ./blog/recent.log</span>
        </div>
        <h2
          className="glow-amber"
          style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "var(--term-amber)",
            marginBottom: "4px",
          }}
        >
          Latest from the Blog
        </h2>
        <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
          Writing about Cloud, DevOps, and the things I build.
        </p>
      </div>

      {/* Post Previews */}
      <div className="flex flex-col gap-3 mb-6">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "14px 18px",
                background: "var(--term-bg-card)",
                border: "1px solid var(--term-border)",
                borderRadius: "4px",
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--term-green-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--term-border)")}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span
                  style={{ color: "var(--term-green-dim)", fontSize: "0.65rem", flexShrink: 0 }}
                >
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span
                  style={{
                    color: "var(--term-white)",
                    fontSize: "0.83rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.title}
                </span>
              </div>
              <div
                className="flex items-center gap-3"
                style={{ color: "var(--term-gray)", fontSize: "0.68rem", flexShrink: 0 }}
              >
                {post.read_time && <span>{post.read_time}m</span>}
                <span>{formatDate(post.published_at)}</span>
                <i
                  className="fas fa-arrow-right"
                  style={{ fontSize: "0.6rem", color: "var(--term-green-dim)" }}
                ></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View all CTA */}
      <div>
        <Link
          to="/blog"
          className="terminal-btn"
          style={{ textDecoration: "none", display: "inline-flex" }}
        >
          <span style={{ color: "var(--term-cyan)" }}>&gt;</span>
          <span>ls -la ./blog/</span>
          <i className="fas fa-folder-open" style={{ fontSize: "0.7rem" }}></i>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
