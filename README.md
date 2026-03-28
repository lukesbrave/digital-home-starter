# Digital Home Starter

An open-source, agent-native website starter kit built for digital sovereignty. Fully owned infrastructure, no platform lock-in.

This is the **Frontend starter** — a skeleton website with the full architecture already built. It handles SEO, AI traffic detection, personalization, email, analytics, and a blog powered by AI-generated content. Behind it sits the [Digital Home Backend](https://github.com/lukesbrave/digital-home-backend) — the operating system that manages content, leads, email, analytics, and AI agents. Both share the same Supabase database.

```
┌─────────────────────────┐     ┌─────────────────────────┐
│     FRONTEND             │     │     BACKEND             │
│  (Public Website)        │     │  (Operating System)     │
│                          │     │                         │
│  Homepage, Blog,         │     │  Content Pipeline,      │
│  Services, Contact,      │     │  Lead Management,       │
│  SEO, AI Detection       │     │  Email, Analytics,      │
│                          │     │  Agent Oversight         │
│  yourdomain.com          │     │  backend.yourdomain.com │
└───────────┬──────────────┘     └───────────┬─────────────┘
            └───────────┬────────────────────┘
                        │
              ┌─────────▼─────────┐
              │     SUPABASE      │
              │  (Shared Database) │
              └───────────────────┘
```

## What You Get

**Full architecture, no design opinions:**
- Supabase database with 10 migration files (visitors, content, offers, leads, analytics, entities, email, etc.)
- API routes for everything (content, leads, analytics, email, entities, offers, agent logs)
- Middleware: visitor tracking, AI traffic detection, personalization rules
- Blog that pulls from Supabase and renders AI-generated articles
- JSON-LD schema markup (dynamic from database)
- llms.txt and robots.txt (AI-crawler friendly)
- Cloudflare Workers deployment via OpenNext
- Content corpus example files (voice, positioning, offers, proof, SEO)

**Skeleton pages you customize:**
- Homepage, About, Services, Contact, Blog — all functional, minimal design
- Every placeholder marked with `[YOUR BRAND]`, `[Your Headline]`, etc.
- Dark theme by default, system fonts, ready to style

> **This is infrastructure, not a finished website.** The starter ships with placeholder text and minimal styling on purpose — the design is yours to build. Every page is functional and ready to customize with your brand, colors, fonts, and content. **[Watch the setup walkthrough →](https://youtu.be/89Fh_Ppw1A8?si=BddgY8Ny7qXMiNEc)**

## Getting Started

1. **Clone and install**
   ```bash
   git clone https://github.com/lukesbrave/digital-home-starter.git
   cd digital-home-starter
   npm install
   ```

2. **Set up Supabase** — create a project at [supabase.com](https://supabase.com) and run the migrations in `supabase/migrations/` (`001` through `011`), then run the Backend migration in `digital-home-backend/supabase/migrations/001_backend_core.sql`

3. **Set up environment** — `cp .env.local.example .env.local` and fill in your credentials, including `RESEND_WEBHOOK_SECRET` for production webhook verification

4. **Set up your content corpus** — `cp -r content-corpus-examples/ content-corpus/` and fill in your brand data

5. **Run locally** — `npm run dev`

6. **Open Claude Code** — say "help me customize this site" and it reads the CLAUDE.md to guide you

See `CLAUDE.md` for the complete setup guide, architecture docs, and Cloudflare deployment instructions.

## Community

The Digital Home is built and maintained by [BraveBrand](https://bravebrand.com). The code is free and open-source — clone it, deploy it, make it yours.

The part the code can't give you is the **brand intelligence** that makes it work: the content corpus process, the AI writing skills, and the strategy behind what to feed your agents so they sound like you instead of generic AI. That lives in the [BraveBrand community on Skool](https://www.skool.com/bravebrand/about), where you'll also find other founders building their own Digital Homes.

## Related

- [Digital Home Backend](https://github.com/lukesbrave/digital-home-backend) — the operating system behind the storefront
- [CLAUDE.md](./CLAUDE.md) — full technical documentation

## License

MIT — see [LICENSE](./LICENSE)
