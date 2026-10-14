import type { Metadata } from "next"
import no from "../../public/locales/no/common.json"

export const SITE_URL = "https://forening.trondheimdc.no"

// Page titles and descriptions are read straight from the Norwegian locale:
// every page is prerendered once, in Norwegian, and that is what crawlers and
// link previews see. Switching to English happens in the browser afterwards.
export { no }

// Rendered by app/opengraph-image.tsx, which reads its alt text and size from here.
export const OG_IMAGE = {
  url: "/opengraph-image",
  alt: "TDC-logoen og «Foreningen bak TDC»",
  width: 1200,
  height: 630,
}

// Next replaces a parent's openGraph object instead of merging it, and a page
// that sets openGraph also loses the image from app/opengraph-image.tsx. So
// every page builds the whole thing here, image included.
export const pageMetadata = ({
  title,
  description,
  path,
}: {
  title?: string // page name only; omit on the front page
  description: string
  path: string // e.g. "/stotte"
}): Metadata => ({
  ...(title ? { title } : {}),
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: "TrondheimDC",
    locale: "nb_NO",
    title: title ? `TrondheimDC | ${title}` : "TrondheimDC",
    description,
    url: path,
    images: [OG_IMAGE],
  },
})
