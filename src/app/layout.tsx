import type { Metadata, Viewport } from "next"
import { no, SITE_URL } from "@/lib/metadata"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TrondheimDC",
    template: "TrondheimDC | %s",
  },
  description: no.meta.description,
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Browser chrome on mobile, matched to --bg-base in each theme.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefefe" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Prerendered in Norwegian; src/i18n.ts keeps lang in sync after a switch.
    // suppressHydrationWarning: next-themes sets data-theme before React loads.
    <html lang="no" suppressHydrationWarning>
      <head>
        {/* The two faces that render above the fold everywhere: body copy and
            headings. Without these the browser only discovers the fonts after
            it has parsed the stylesheet, which is what makes the swap from the
            fallback visible. The remaining weights and the latin-ext subsets
            stay lazy. They are rarely, if ever, needed on first paint.
            Headings are 400, not 700: Tailwind's preflight resets h1-h6 to
            `font-weight: inherit`, so they inherit the body's weight and only
            the display family changes. Preloading Space Grotesk 700 here
            fetches a file no heading on the page asks for. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/ibm-plex-sans-latin-400-normal.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/space-grotesk-latin-400-normal.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
