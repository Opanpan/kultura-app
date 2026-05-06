# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build (outputs standalone)
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no tests in this project.

## Architecture

This is a **Next.js 16 App Router** marketing site for Kultura Properties (Indonesian real estate developer). The stack is Next.js + Tailwind CSS v4 + Framer Motion, TypeScript throughout.

### Routing & i18n

All pages live under `app/[locale]/`. The middleware (`proxy.ts`, exported as `middleware`) detects the browser's `Accept-Language` header and redirects `/` to `/id` or `/en`. Supported locales: `id` (default), `en`.

- `app/layout.tsx` — root shell: theme-init script (reads `sessionStorage.theme`), global metadata, DNS prefetch
- `app/[locale]/layout.tsx` — locale shell: validates locale, loads dictionary, renders `<Header>`, `<Footer>`, and JSON-LD schemas
- `app/[locale]/page.tsx` — single-page site: stacks all section components

### Internationalization

Dictionaries are plain JSON files at `app/[locale]/dictionaries/{en,id}.json`. They are loaded server-side only (`"server-only"`) via `app/[locale]/dictionaries.ts`. Every component that needs copy receives a `dict` prop typed as `Dictionary`. **All user-visible strings must live in both dictionary files.**

Theme and locale selections are stored in `sessionStorage` (not `localStorage`) so they reset on each new browser session.

### Components

- `components/layout/` — `Header`, `Footer`, `CollabForm` (contact form that POSTs to `/api/collab`)
- `components/sections/` — page sections rendered in order by `page.tsx`
- `components/seo/structured-data.tsx` — JSON-LD schemas (Website, Organization, LocalBusiness, FAQ)
- `components/ui/` — `ThemeToggle` (dark/light), `SessionLocaleReset` (resets locale cookie on new session)

### Styling

Tailwind CSS v4 with PostCSS. Design tokens are CSS custom properties defined in `globals.css`:

| Variable | Light | Dark |
|---|---|---|
| `--bg` | `#ffffff` | `#0a0a0a` |
| `--fg` | `#0a0a0a` | `#fafafa` |
| `--muted` | `#f5f5f5` | `#1a1a1a` |
| `--card` | `#ffffff` | `#141414` |
| `--border` | `#e5e5e5` | `#262626` |

Dark mode is class-based (`.dark` on `<html>`). Use `var(--bg)`, `var(--fg)`, etc. for theme-aware colors instead of hardcoded values.

### Animations

Reusable Framer Motion variants live in `lib/animations.ts` (`fadeUp`, `fadeIn`, `stagger`, `scaleUp`). Import `lib/framer-features.ts` (re-exports `domAnimation`) as the `LazyMotion` feature bundle to keep bundle size down.

### API

`app/api/collab/route.ts` — POST endpoint for the collaboration/contact form. Applies:
- In-memory rate limiting: 3 requests per IP per 10 minutes
- 16 KB payload size guard
- Honeypot field (`website`) to reject bots
- HTML-strip sanitization on all string fields
- Forwards clean data to `GOOGLE_SHEET_WEBHOOK` (env var) via GET with query params

### Environment Variables

| Variable | Purpose |
|---|---|
| `GOOGLE_SHEET_WEBHOOK` | Google Apps Script URL that writes form submissions to a sheet |

### Deployment

Docker-based. `next.config.ts` sets `output: "standalone"`. The `proxy-network/` directory contains an Nginx reverse-proxy config for production (`kultura.id`). Use `init-deploy.sh` / `init-letsencrypt.sh` for first-time server setup.
