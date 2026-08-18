import { useQuery } from "@tanstack/react-query";

const FALLBACK_COMMITS = [
  {
    id: "commit-1",
    sha: "9a24113",
    repo: "mustaphahaadi/portfolio",
    message: "feat: add architecture diagrams & instant contact alerts",
    date: "Just now",
  },
  {
    id: "commit-2",
    sha: "2be02b0",
    repo: "mustaphahaadi/portfolio",
    message: "perf: optimize Tailwind CSS bundle size by 99.5%",
    date: "1 hour ago",
  },
  {
    id: "commit-3",
    sha: "d95ab91",
    repo: "mustaphahaadi/portfolio",
    message: "feat: integrate Supabase serverless database layer",
    date: "Yesterday",
  },
  {
    id: "commit-4",
    sha: "f41c90e",
    repo: "mustaphahaadi/cloud-infra",
    message: "ci: update Terraform AWS EKS deployment workflow",
    date: "3 days ago",
  },
];

const formatRelativeTime = (isoString) => {
  if (!isoString) return "Recently";
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const GithubFeed = () => {
  const { data: commits, isLoading } = useQuery({
    queryKey: ["github-activity"],
    queryFn: async () => {
      try {
        const res = await fetch("https://api.github.com/users/mustaphahaadi/events");
        if (!res.ok) throw new Error("GitHub API limit");
        const events = await res.json();
        
        // Filter push events and payload commits
        const parsed = events
          .filter((e) => e.type === "PushEvent")
          .slice(0, 4)
          .map((ev) => {
            const repoName = ev.repo?.name || "mustaphahaadi/repo";
            const commitMsg =
              ev.payload?.commits?.[0]?.message ||
              `Pushed to ${ev.payload?.ref?.replace("refs/heads/", "") || "main"}`;
            const sha = ev.payload?.head?.substring(0, 7) || "head";
            return {
              id: ev.id,
              sha,
              repo: repoName,
              message: commitMsg,
              date: formatRelativeTime(ev.created_at),
            };
          });

        return parsed.length > 0 ? parsed : FALLBACK_COMMITS;
      } catch (err) {
        console.warn("GitHub events fetch fallback:", err);
        return FALLBACK_COMMITS;
      }
    },
    staleTime: 1000 * 60 * 10, // Cache 10 mins
  });

  const displayCommits = commits || FALLBACK_COMMITS;

  return (
    <div
      className="mx-auto mt-6"
      style={{
        maxWidth: "700px",
        background: "rgba(10, 15, 25, 0.8)",
        border: "1px solid var(--term-border)",
        borderRadius: "6px",
        padding: "14px 16px",
        fontFamily: "var(--term-font)",
      }}
    >
      <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
        <div style={{ color: "var(--term-gray)", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--term-cyan)" }}>$</span> git log --recent --oneline -n 4
        </div>
        <a
          href="https://github.com/mustaphahaadi"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.7rem",
            color: "var(--term-green)",
            textDecoration: "none",
          }}
          className="hover:underline flex items-center gap-1"
        >
          <i className="fab fa-github"></i>
          <span>@mustaphahaadi</span>
        </a>
      </div>

      {isLoading ? (
        <div className="text-center py-3" style={{ color: "var(--term-gray)", fontSize: "0.75rem" }}>
          <i className="fas fa-spinner fa-spin mr-2" style={{ color: "var(--term-green)" }}></i>
          Fetching latest commits from GitHub...
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {displayCommits.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-2 text-xs"
              style={{
                fontFamily: "var(--term-font)",
                color: "var(--term-gray)",
                fontSize: "0.75rem",
              }}
            >
              <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                <span
                  style={{
                    color: "var(--term-amber)",
                    fontWeight: "600",
                    fontSize: "0.7rem",
                  }}
                >
                  [{item.sha}]
                </span>
                <span style={{ color: "var(--term-cyan-dim)" }}>
                  {item.repo.replace("mustaphahaadi/", "")}:
                </span>
                <span
                  className="truncate"
                  style={{ color: "#e2e8f0" }}
                  title={item.message}
                >
                  {item.message}
                </span>
              </div>
              <span
                style={{
                  color: "var(--term-gray-dim)",
                  fontSize: "0.65rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item.date}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GithubFeed;
