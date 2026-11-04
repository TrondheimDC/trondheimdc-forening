import type { Metadata, Viewport } from "next"
import { preload } from "react-dom"
import { no, OG_IMAGE, SITE_URL } from "@/lib/metadata"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TrondheimDC",
    template: "TrondheimDC | %s",
  },
  description: no.meta.description,
  // Pages replace this with pageMetadata(); it's what the 404 page gets.
  openGraph: { siteName: "TrondheimDC", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Browser chrome on mobile, matched to --color-bg-base in each theme.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefefe" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
}

// The faces that render above the fold everywhere: body copy, headings and
// the CTA buttons. Without these the browser only discovers the fonts after it
// has parsed the stylesheet, which is what makes the swap from the fallback
// visible. The remaining weights and the latin-ext subsets stay lazy. They are
// rarely, if ever, needed on first paint.
// Headings are 400: Tailwind's preflight resets h1-h6 to `font-weight:
// inherit`, so they inherit the body's weight and only the display family
// changes. Buttons are `font-display font-semibold`, and with no Space
// Grotesk 600 file the browser resolves 600 to the 700 face, so that one is
// preloaded too.
// `preload()`, not <link> tags in <head>: React hoists a preload <link> into
// the head and also renders the element where it was written, so the tags
// shipped every hint twice. `preload()` emits each one once.
const ABOVE_THE_FOLD_FONTS = [
  "/fonts/ibm-plex-sans-latin-400-normal.woff2",
  "/fonts/space-grotesk-latin-400-normal.woff2",
  "/fonts/space-grotesk-latin-700-normal.woff2",
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  for (const href of ABOVE_THE_FOLD_FONTS) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" })
  }

  return (
    // Prerendered in Norwegian; src/i18n.ts keeps lang in sync after a switch.
    // suppressHydrationWarning: next-themes sets data-theme before React loads.
    <html lang="no" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
