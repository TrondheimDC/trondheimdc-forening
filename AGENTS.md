<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Foreningen TrondheimDC

The association's website: what it does, the user groups in Trondheim, the support scheme, the community stand, past conferences, and the vedtekter. Live at https://forening.trondheimdc.no.

## Architecture

- **Static site.** Next.js App Router with `output: "export"`, served by nginx (`docs/deploy.md`). No app server and no secrets. Nothing renders per request: no Route Handlers that read the request, no cookies.
- **Every page is prerendered once, in Norwegian.** English is a client-side switch (`src/i18n.ts`, `react-i18next`), so components that show copy are client components. Each `page.tsx` is a server component that exports `metadata` and renders the page body from `content.tsx`.
- **Titles and descriptions** come from the Norwegian locale through `pageMetadata()` in `src/lib/metadata.ts`. Use it for every page: Next replaces a parent's `openGraph` instead of merging it, and a page that sets its own loses the image from `opengraph-image.tsx`.
- **Copy lives in `public/locales/{no,en}/common.json`.** Change both files together. Data lives in `src/data` (groups, archive).
- **Images:** `src/app/icon.svg` is the source for the favicon and apple icon (`node scripts/build-icons.mjs`); `src/app/opengraph-image.tsx` is the link preview, rendered at build time.

## Copy

- Norwegian bokmål first, English second. Write it in TDC's voice, short and plain.
- Facts about TDC (history, numbers, offers) need a source: a TDC page or someone on the committee. Never paraphrase a search result into site copy.
- New or changed copy that hasn't been signed off gets a line in `TODO.local.md`. It is gitignored: the repo is public, and sign-off notes are internal.
- No em dashes. Keep "TDC-samfunnet" as written.
- The vedtekter (`src/app/vedtekter/content.tsx`) are the legally binding text. Don't edit them for style.

## No pop-in

- Reserve space for anything that appears after hydration (the hero tiles, the theme toggle, the archive screenshots) so the layout doesn't shift.
- The theme is applied before React loads (`next-themes`); style both themes with the `light:`/`dark:` variants, not by reading the theme in JS.
