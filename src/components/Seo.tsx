import Head from "next/head"

export const SITE_URL = "https://forening.trondheimdc.no"

// Every page is prerendered once, in Norwegian, so that is what crawlers and
// link previews see. Link previews need absolute URLs, hence SITE_URL.
export const Seo = ({
  title,
  description,
  path,
}: {
  // Page name only; the site name is added here. Omit on the front page.
  title?: string
  description: string
  // Without the .html the export writes, e.g. "/stotte". Omit on pages that
  // shouldn't be indexed or shared (the 404).
  path?: string
}) => {
  const fullTitle = title ? `TrondheimDC | ${title}` : "TrondheimDC"
  const url = path === undefined ? undefined : `${SITE_URL}${path}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      {url ? null : <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TrondheimDC" />
      <meta property="og:locale" content="nb_NO" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="TDC-logoen og «Foreningen bak TDC»"
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
