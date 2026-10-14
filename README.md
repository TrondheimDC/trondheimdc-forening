# Foreningen TrondheimDC

Nettside for foreningen TrondheimDC (org.nr 936657788), som arrangerer
TDC-konferansen og støtter det lokale, frivillige IT-fagmiljøet i
Trondheimsregionen.

## Tech stack

- **Framework:** Next.js (Pages Router, static export via `output: "export"`)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS, design tokens ported from [trondheimdc.no](https://github.com/TrondheimDC/trondheimdc.no)
- **i18n:** Client-side i18next (Norwegian / English), Norwegian default
- **Package manager:** pnpm

**Requirements:** Node.js 24 (pinned in `mise.toml`).

## Getting started

### With Mise

```bash
mise install   # install Node (and use project tools)
mise run install
mise run dev   # or: mise dev
```

Open [http://localhost:3000](http://localhost:3000).

**Tasks:** `mise run install` | `mise run dev` | `mise run build` | `mise run check` | `mise run start`

### Without Mise

Install Node and pnpm

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

- Meetup groups: `src/data/groups.ts`
- Conference archive: `src/data/archive.ts`
- Vedtekter: `src/pages/vedtekter.tsx` (Norwegian only, legally binding text)
- Support criteria: `src/pages/stotte.tsx`

See [TODO.md](./TODO.md) for outstanding content decisions before launch, and [docs/deploy.md](./docs/deploy.md) for deploying.
