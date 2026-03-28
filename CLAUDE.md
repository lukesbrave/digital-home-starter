# Digital Home Starter

This is an open-source, AI-native website and content system. If someone opens this project and asks for help, walk them through the First Time Setup below step by step. Ask them for each piece of information as you go (API keys, project URLs, brand details) — don't assume anything.

## First Time Setup

If you just cloned this repo, follow these steps in order. You need both this repo (Frontend) and the [Digital Home Backend](https://github.com/lukesbrave/digital-home-backend) repo.

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free project
2. Save these values from Settings > API:
   - **Project URL** (e.g., `https://abcdefg.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role secret key** (starts with `eyJ...` — keep this secret)

### Step 2: Run Database Migrations
1. In your Supabase dashboard, go to **SQL Editor**
2. Run each migration file from `supabase/migrations/` in order (001 through 011)
3. Then run the Backend migration from the Backend repo:
   - `digital-home-backend/supabase/migrations/001_backend_core.sql`
4. The shared database is now ready for both repos:
   - public read access is limited to published content and active offers
   - admin and agent operations happen through protected API routes

### Step 3: Create an Admin User
1. In Supabase dashboard, go to **Authentication > Users > Add user**
2. Set an email and password — this is your login for the Backend dashboard
3. There is no public signup. All admin users are created here.

### Step 4: Set Up Environment Variables
```bash
cp .env.local.example .env.local
```
Fill in your Supabase URL, anon key, service role key, and site name. See the "Environment Variables" section below for the full list.

### Step 5: Set Up Your Content Corpus
```bash
cp -r content-corpus-examples/ content-corpus/
```
Edit each file in `content-corpus/` with your brand's voice, positioning, offers, testimonials, and keywords. **This is the most important step** — it's what makes the AI write like you instead of generic slop.

> **⚠️ Don't rush this step.** The content corpus is the difference between AI that writes like you and AI that writes like everyone else. A properly built corpus includes:
>
> - **Voice Guide** — your tone, writing style, personality, banned phrases, and influences
> - **Tone Examples** — real samples of how you write so the AI can mirror your cadence
> - **Content Hooks** — the angles, frameworks, and opening patterns that engage your audience
> - **Core Positioning** — who you serve, what you stand for, how you're different
> - **Offer Architecture** — your services, pricing structure, and transformation promise
> - **Competitive Landscape** — what alternatives exist and why your approach is better
> - **SEO Keyword Clusters** — the search terms and topic clusters you want to own
> - **Case Studies & Testimonials** — proof that your methodology works
>
> The example files in `content-corpus-examples/` show the format. You can fill them in yourself, or use the structured brand intake process and content corpus skill available in the [BraveBrand community](https://www.skool.com/bravebrand) — which walks you through a guided interview and generates all of these files from your answers.
>
> **Do not skip to the next step until your content corpus is complete.** Everything the AI writes — articles, SEO metadata, CTAs — is only as good as what you put here.

You also need three special entries in the `brand_context` table (add via Supabase dashboard → Table Editor → brand_context → Insert row):

**CTA Links** — the links the AI will use in article CTAs:
```
category: cta
key: links
content: (your CTA links in HTML — one per line, with descriptions of when to use each)
```

**Author Name** — the byline on articles:
```
category: identity
key: author
content: [Your Name]
```

**Image Style** — controls the AI-generated hero images (uses DALL-E):
```
category: content
key: image_style
content: (your image style description — composition, color palette, lighting, mood, what to avoid)
```
If no image style is configured, the system uses a clean editorial photography default. You can describe any aesthetic — minimalist, bold, illustrated, photographic — and every generated hero image will follow it.

### Step 6: Install and Run
```bash
npm install
npm run dev
```

### Step 7: Customize Your Pages
This starter is infrastructure, not a finished website — the design is yours to build. Every page has placeholder content marked with `[YOUR BRAND]`, `[Your Headline]`, etc. Open each page in `src/app/` and replace the placeholders with your actual content, brand colors, fonts, and styling.

**[Watch the customization walkthrough →](https://youtu.be/89Fh_Ppw1A8?si=BddgY8Ny7qXMiNEc)**

Claude Code can help — say "help me customize the homepage."

### Step 8: Deploy to Cloudflare
```bash
npm run build
npx wrangler deploy
```
Then set server-side secrets via `wrangler secret put` (see Environment Variables section below).

### Step 9: Set Up the Backend
Clone and set up the [Digital Home Backend](https://github.com/lukesbrave/digital-home-backend) repo — follow its CLAUDE.md for instructions. The Backend manages your content pipeline, and both repos share the same Supabase database.

### Step 10: Set Up Autonomous Publishing (GitHub Actions)
The repo includes two GitHub Actions workflows in `.github/workflows/`:
- **`daily-publish.yml`** — runs daily at 9:03 AM UTC, picks an approved topic from the content calendar and writes + publishes an article using Claude Code
- **`weekly-trends.yml`** — runs every Monday at 10:07 AM UTC, scans for trending topics and adds them to the content calendar

To enable these, add the following **secrets** to your GitHub repo (Settings > Secrets and variables > Actions > New repository secret):
1. **`ANTHROPIC_API_KEY`** — your Anthropic API key (same one from Step 2 of the Backend setup)
2. **`API_SECRET_KEY`** — the shared secret between Frontend and Backend

And add this **repository variable** (Settings > Secrets and variables > Actions > Variables tab > New repository variable):
3. **`SITE_URL`** — your live Backend URL (e.g., `https://backend.yourdomain.com`) — the workflows call the Backend's `/api/write-article` route

You can test the workflow by going to Actions > Daily Article Publish > Run workflow. The first run will only work after the Backend is deployed and has approved topics in the content calendar.

### Need Help?
The Digital Home is built and maintained by BraveBrand. If you want help with:
- The brand intelligence process (content corpus, voice guide, positioning)
- The AI writing skills and content strategy workflow
- Design guidance and implementation support
- A community of founders building their own Digital Homes

Join the [BraveBrand community on Skool](https://www.skool.com/bravebrand/about).

---

## Project Overview
This is a Next.js 15 website starter deployed on Cloudflare Workers with Supabase as the data layer. The site is designed to speak to three audiences simultaneously: human visitors (personalized UX), AI agents (REST API), and search engines/LLMs (structured data + llms.txt).

**This is the Frontend** — the client-facing public website. Behind it sits the **Digital Home Backend** (separate repo), which is the backend operating system — content pipeline, lead management, email sequences, analytics, and agent oversight. Both share the same Supabase database.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript, RSC by default)
- **Styling:** Tailwind CSS v4
- **Hosting:** Cloudflare Workers via `@opennextjs/cloudflare` (OpenNext)
- **Database:** Supabase (PostgreSQL) — schema in `/supabase/migrations/`
- **Email:** Resend
- **Auth:** Supabase Auth (admin dashboard only)

## Project Structure
```
/digital-home-starter/
  CLAUDE.md              <- You are here
  /content-corpus-examples  <- Template brand files (copy to content-corpus/)
  /supabase/migrations      <- Database schema (run in order)
  /src
    /app
      layout.tsx         <- Root layout, metadata, fonts
      page.tsx           <- Homepage (skeleton)
      /blog              <- Blog index + article pages (functional)
      /services          <- Services page (skeleton)
      /about             <- About page (skeleton)
      /contact           <- Contact page (skeleton)
      /api               <- API routes (content, leads, email, analytics, etc.)
      /robots.txt        <- Dynamic robots.txt (AI-crawler friendly)
      /sitemap.ts        <- Dynamic sitemap from published content
      /llms.txt          <- llms.txt for AI agents
    /components
      /layout            <- NavBar (customize with your logo)
      /seo               <- SchemaMarkup (dynamic from entities)
    /lib
      /supabase          <- Supabase client (browser + server)
      /attribution       <- UTM, referrer, AI traffic detection
      /analytics         <- Event tracking
      /schema            <- JSON-LD generators, llms.txt generator
      /email             <- Resend client
    /types/database.ts   <- Shared database types (keep in sync with Backend)
    /middleware.ts       <- Visitor tracking, AI detection, personalization
```

## Environment Variables

### Build-time public variables
These go in the Cloudflare dashboard AND in `wrangler.jsonc` under `vars`:
```
NEXT_PUBLIC_SUPABASE_URL      — Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon key
NEXT_PUBLIC_SITE_URL          — Your live site URL (e.g., https://yourdomain.com)
NEXT_PUBLIC_SITE_NAME         — Your brand name
SUPABASE_URL                  — Runtime duplicate for server-side access
SUPABASE_ANON_KEY             — Runtime duplicate for server-side access
```

### Server-side secrets
Set via `wrangler secret put` from the terminal:
```
SUPABASE_SERVICE_ROLE_KEY     — Service role key, bypasses RLS
API_SECRET_KEY                — Shared secret between Frontend and Backend (must match both)
RESEND_API_KEY                — Resend email API key
RESEND_WEBHOOK_SECRET         — Resend webhook signing secret (required in production)
```

## Cloudflare / OpenNext Rules

This project runs on Cloudflare Workers via `@opennextjs/cloudflare` (OpenNext). These rules prevent build and runtime failures:

### NEVER add edge runtime exports
Do **not** add `export const runtime = 'edge'` to any route file. OpenNext handles runtime assignment itself and rejects manual edge runtime exports.

### NEXT_PUBLIC_ vars don't exist at runtime on Workers
Cloudflare Workers can only read `NEXT_PUBLIC_` variables at build time (baked into the JS bundle). At runtime on the server, they're `undefined`. This is why:
- `wrangler.jsonc` has both `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`
- `src/lib/supabase/server.ts` uses the fallback pattern: `process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL`
- When creating new server-side code that reads env vars, always use this fallback pattern

### Secrets must be set via Wrangler CLI
Server-side secrets must be set using `wrangler secret put`. The Cloudflare dashboard UI only works for Pages projects, not Workers.

### Always run `npm run build` before pushing
`next dev` does not catch all TypeScript errors. `next build` does.

## Key Architecture Decisions
- **Cloudflare, not Vercel** — zero egress fees, predictable pricing
- **Native email (Resend), not a third-party platform** — unified data, agent-managed, no platform lock-in
- **Content as structured objects** — every piece of content is a row in `content_objects` with metadata, semantic tags, associated offers, and performance data
- **Personalization via rules engine** — JSON rules stored in `personalization_rules` table, evaluated per visitor on each page load
- **Knowledge graph in the database** — `entities` and `entity_relationships` tables, JSON-LD generated dynamically
- **Schema markup on every page** — dynamically generated from `entities` table, never hardcoded

## Important Conventions
- **Server Components by default.** Only use `'use client'` when interactivity requires it.
- Public API surface is intentionally small:
  - public: content reads, active offers, analytics event posting, lead capture
  - admin/session-only: visitors, leads queries, analytics queries, content calendar, entities, agent logs
  - agent-capable: selected write routes using `x-api-key`
- Every page should include dynamic JSON-LD from the `entities` table.
- Visitor tracking is anonymous until opt-in. No PII before email capture.
- **CRITICAL — Shared database types:** When you modify `src/types/database.ts`, you MUST also update the same file in the Backend project. These two files must always be identical.

## Customization Guide

### Pages to customize (in order of importance)
1. **`src/app/page.tsx`** — Homepage: headline, description, services preview, CTA
2. **`src/app/about/page.tsx`** — Your story, beliefs, team members
3. **`src/app/services/page.tsx`** — Your service offerings
4. **`src/app/contact/page.tsx`** — Contact methods and email
5. **`src/app/layout.tsx`** — Site title and metadata
6. **`src/components/layout/NavBar.tsx`** — Your logo/brand name

### Design customization
- **Colors:** Edit CSS variables in `src/app/globals.css` (the `:root` block)
- **Fonts:** Replace the Google Fonts imports in `src/app/layout.tsx` or add your own @font-face
- **Logo:** Replace `[YOUR BRAND]` text in NavBar.tsx with an `<img>` tag pointing to your logo in `/public/`

### Content that auto-populates from the database
- Blog articles (written by the Backend's AI content pipeline)
- JSON-LD schema (from the `entities` table)
- llms.txt (from entities, content, and offers)
- Sitemap (from published content)
