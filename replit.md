# LMPYOG Command Center Workspace

## Overview

Full-stack YouTube channel command center for "Let Me Put You On Game" (LMPYOG). Dark investigative ops aesthetic with neon orange (#FF5F00) branding.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Build**: esbuild (CJS bundle)

## Brand

- Primary color: #FF5F00 (neon orange)
- Background: #000 (black)
- Motto: "Truth. No Filter. No Apologies."
- Schedule: Mon / Wed / Fri @ 7PM EST
- Assets: `/artifacts/command-center/public/assets/` (banner.png, avatar.png)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (all backend routes)
│   └── command-center/     # React + Vite frontend (served at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── attached_assets/        # Brand assets (banner, avatar images)
└── scripts/                # Utility scripts
```

## Features

1. **Intel Dashboard** — Narrative targets tracker, channel stats, banner display
2. **Research Terminal (Receipts)** — Gemini AI-powered investigative research with web grounding
3. **B-Roll Harvest Engine** — Clip library (YouTube/C-SPAN), keyword search, transcripts, Season folders
4. **Script Lab** — Episode script drafts with status tracking (draft → final)
5. **Operations** — Episode tracker with status pipeline (planning → published), content calendar
6. **Brand / Comms** — Brand assets, color profile, channel metadata

## Database Tables

- `scripts` — script drafts with title, episode, content, status
- `clips` — B-Roll clips with sourceUrl, platform, keywords, transcript, season
- `episodes` — episode tracker with status pipeline and scheduled dates
- `trends` — narrative targets/investigation topics

## API Routes

All routes under `/api`:
- `POST /api/research` — Run Gemini AI investigative research
- `GET/POST /api/scripts`, `GET/PUT/DELETE /api/scripts/:id`
- `GET/POST /api/clips`, `DELETE /api/clips/:id`
- `GET/POST /api/episodes`, `PUT /api/episodes/:id`
- `GET/POST /api/trends`, `DELETE /api/trends/:id`

## AI Research

Research uses Gemini 2.0 Flash with Google Search grounding. Requires `GEMINI_API_KEY` environment variable. Without it, returns a helpful placeholder message.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json`. Run `pnpm run typecheck` from root. Do NOT use `tsc` inside single packages.

## Root Scripts

- `pnpm run build` — typecheck then build all packages
- `pnpm run typecheck` — full type check
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
