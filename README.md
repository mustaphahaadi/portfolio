<div align="center">

# haadi@cloud:~/portfolio

**Terminal-themed Cloud & DevOps portfolio** — built with React, powered by Supabase, deployed on Vercel.

[![Live Site](https://img.shields.io/badge/Live-mustaphahaadi.vercel.app-00ff41?style=for-the-badge&logo=vercel&logoColor=black)](https://mustaphahaadi.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## Features

| Feature | Details |
| :--- | :--- |
| 🖥️ **Terminal / CRT aesthetic** | Custom CSS design system with green-on-black scanlines, glow effects, and monospace typography |
| ⚡ **React SPA** | Client-side routing via React Router v6 — zero full-page reloads between home and blog |
| 📝 **Blog** | Markdown posts with syntax highlighting, reading progress bar, ToC sidebar, tag & category filters |
| 🗄️ **Supabase backend** | PostgreSQL with Row Level Security for all content (profile, projects, blog posts, etc.) |
| 🐙 **Live GitHub feed** | Real-time activity feed pulled from the GitHub Events API |
| 📬 **Contact alerts** | Instant email notifications via Formspree on every contact form submission |
| 📦 **Code splitting** | Vendor chunks per dependency group (react, query, supabase, markdown) for fast initial load |
| ✅ **Tests** | Vitest + jsdom unit test suite (7 tests, 3 files) |

---

## Tech Stack

```
Frontend    React 18 · Vite 5 · React Router v6 · Framer Motion
Data        Supabase (PostgreSQL + RLS) · TanStack Query v5
Blog        react-markdown · remark-gfm · rehype-highlight
Styling     Vanilla CSS (terminal.css design system) · Tailwind utility classes
Deploy      Vercel (auto-deploy on push to main)
Testing     Vitest · jsdom
```

---

## Project Structure

```
portfolio-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── terminal.css        # Core design system (tokens, CRT, glow effects)
│   │       └── tailwind.css        # Tailwind utility layer
│   ├── components/
│   │   ├── Navbar.jsx              # SPA-aware navbar with smooth scroll
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── PortfolioSection.jsx
│   │   ├── ToolsSection.jsx
│   │   ├── CertificationsSection.jsx
│   │   ├── GithubFeed.jsx          # Live GitHub activity feed
│   │   ├── TestimonialSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── BlogSection.jsx         # 3-post teaser on home page
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── BlogListPage.jsx        # /blog — listing with search, tags, categories
│   │   └── BlogPostPage.jsx        # /blog/:slug — full post with ToC + progress bar
│   ├── services/
│   │   └── api.js                  # All Supabase query functions
│   ├── test/
│   │   ├── setup.js
│   │   ├── api.test.js
│   │   ├── blog.test.js
│   │   └── components.test.jsx
│   ├── App.jsx                     # Routes: / · /blog · /blog/:slug
│   └── main.jsx                    # QueryClient + BrowserRouter setup
├── supabase/
│   └── migrations/
│       └── 003_blog_posts.sql      # Blog table migration
├── supabase_schema.sql             # Full idempotent schema (run this in Supabase)
├── vite.config.js
└── package.json
```

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/mustaphahaadi/portfolio-frontend.git
cd portfolio-frontend
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> Get these from **Supabase Dashboard → Project Settings → API**.

### 3. Provision the database

Open your **Supabase project → SQL Editor**, paste the full contents of [`supabase_schema.sql`](./supabase_schema.sql), and click **Run**.

This will:
- Create all tables (`profile`, `experiences`, `projects`, `tools`, `education`, `certifications`, `services`, `testimonials`, `contact_messages`, `blog_posts`)
- Enable Row Level Security on every table
- Apply all RLS policies (public read, admin write)
- Seed initial data so the site is populated immediately

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Routes

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `App.jsx` → all sections | Full portfolio home page |
| `/blog` | `BlogListPage.jsx` | Blog listing with search and filters |
| `/blog/:slug` | `BlogPostPage.jsx` | Individual post rendered from Markdown |

---

## Database Schema

All tables live in `public` schema with RLS enabled.

| Table | Purpose |
| :--- | :--- |
| `profile` | Name, bio, social links, avatar |
| `experiences` | Work history |
| `projects` | Portfolio projects |
| `tools` | Tech stack / tools |
| `education` | Academic background |
| `certifications` | Certs and credentials |
| `services` | Services offered |
| `testimonials` | Client / colleague quotes |
| `contact_messages` | Form submissions (insert-only for public) |
| `blog_posts` | Blog content — `slug`, `title`, `content` (Markdown), `is_published` |

### RLS Rules Summary

- **Public (anon):** read-only on all tables except `contact_messages` (insert-only) and `blog_posts` (only rows where `is_published = true`)
- **Authenticated:** full control on all tables

---

## Writing Blog Posts

Posts are managed directly in Supabase. To publish a new post:

1. Open **Supabase Dashboard → Table Editor → blog_posts**
2. Insert a row with:
   - `slug` — URL-safe identifier, e.g. `my-post-title`
   - `title` — display title
   - `excerpt` — short summary shown on the listing page
   - `content` — full Markdown body (supports GFM + fenced code blocks)
   - `tags` — PostgreSQL array, e.g. `{AWS,DevOps}`
   - `category` — single string, e.g. `Infrastructure`
   - `read_time` — estimated minutes (integer)
   - `is_published` — set to `true` to go live
   - `published_at` — timestamp

The site fetches published posts via the Supabase JS client — no redeploy needed.

---

## Available Scripts

```bash
npm run dev        # Start dev server on :5173
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npx vitest run --pool=forks   # Run test suite
```

---

## Deployment

The project auto-deploys to **Vercel** on every push to `main`.

Required environment variables in Vercel:

| Variable | Value |
| :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

> Set these under **Vercel → Project Settings → Environment Variables**.

---

## License

MIT © [Mustapha Haadi](https://github.com/mustaphahaadi)
