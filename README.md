# Baseline Web App

A clean, local-first Next.js application skeleton with a compact sidebar, dark design system, reusable UI primitives, and representative routes.

## Stack

- Next.js App Router, React, and strict TypeScript
- Tailwind CSS with source-owned shadcn/ui components
- Radix UI primitives and Lucide icons
- TanStack Query and TanStack Table
- React Hook Form with Zod validation
- nuqs for URL-backed state, sonner for toasts, date-fns for dates
- Typed environment variables via t3-env (`env.ts`)
- Prettier (Tailwind class sorting), knip dead-code analysis, Vitest, Playwright
  and axe accessibility checks

## Local development

Requires Node.js 22+ (`.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The development server binds to `127.0.0.1` and is not exposed to the local
network. In VS Code, run **App: Run development server** for ordinary work and
reserve **App: Debug server (Webpack)** for intentional breakpoint sessions.
Normal development keeps Turbopack; the debug launch uses Webpack for debugger-
compatible source maps.

## Routes

- `/` — overview, design-system reference, and UI kitchen sink
- `/projects` — generic collection empty state
- `/settings` — settings shell
- `/api/health` — basic health response

## Agent guidance

- `AGENTS.md` — workflow, Overview contract, definition of done
- `docs/constitutions/` — library rules (indexed in `docs/constitutions/index.md`)
- `docs/recipes/` — feature scaffolds for common page shapes
- `CONTRIBUTING.md` — Conventional Commits and PR expectations
- `.cursor/rules/` — path-scoped Cursor rules

## Validation

```bash
npm run check     # lint, typecheck, format, dead code, unit tests, build
npm run check:all # check plus Playwright across desktop and mobile Chromium
npm run test      # Vitest unit tests for lib/
npm run test:e2e  # Playwright end-to-end tests
```

CI runs `npm run check`, Playwright e2e (axe serious/critical gates), and an
advisory `npm audit`. Failed browser runs retain their report, traces, and
screenshots as CI artifacts. Dependabot opens weekly dependency PRs. Pre-commit
formats staged files with husky + lint-staged.

Production validation builds the OpenNext Worker and performs a Wrangler
deployment dry run.

## Cloudflare deployment

This full-stack application deploys to Cloudflare Workers through the OpenNext
adapter. Cloudflare Pages supports Next.js as a static export only, so Pages is
not a compatible target while server routes such as `/api/health` remain part of
the application.

```bash
npm run preview # build and run locally in workerd
npm run deploy  # build and deploy to Cloudflare Workers
```

The Worker configuration lives in `wrangler.jsonc`. Before the first deploy,
authenticate Wrangler with `npx wrangler login`, or provide Cloudflare API
credentials through the deployment environment. Add future build-time values
and secrets to the Cloudflare Workers build configuration as well as to the
deployed Worker.
