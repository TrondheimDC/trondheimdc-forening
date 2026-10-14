// Renders public/og-image.jpg from scripts/og-image.tsx with Satori (JSX → SVG)
// and sharp (SVG → JPEG). The copy comes from the Norwegian locale (hero.kicker,
// hero.subtitle), the language crawlers see. Runs as part of `pnpm build`.
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import satori from "satori"
import sharp from "sharp"
import { OG_SIZE, OgImage } from "./og-image"

const root = join(__dirname, "..")
const pub = (file: string) => join(root, "public", file)
const font = (pkg: string, file: string) =>
  readFileSync(join(root, "node_modules/@fontsource", pkg, "files", file))
const dataUrl = (type: string, data: Buffer) =>
  `data:${type};base64,${data.toString("base64")}`

const { hero } = JSON.parse(readFileSync(pub("locales/no/common.json"), "utf8"))

// A function rather than top-level await: the package is CommonJS.
const main = async () => {
  // The logo is stacked blocks that only just touch; a hairline stroke closes the
  // anti-aliasing seams that otherwise show between them.
  const logo = readFileSync(pub("img/logos/TDC_white.svg"), "utf8").replaceAll(
    'fill="white"',
    'fill="white" stroke="white" stroke-width="0.8"',
  )
  // Satori doesn't decode WebP, so hand it a PNG of the hero backdrop.
  const background = await sharp(pub("img/hero-background.webp")).png().toBuffer()

  const svg = await satori(
    <OgImage
      kicker={hero.kicker}
      subtitle={hero.subtitle}
      logo={dataUrl("image/svg+xml", Buffer.from(logo))}
      background={dataUrl("image/png", background)}
    />,
    {
      ...OG_SIZE,
      // Satori reads woff and ttf, not the woff2 the site serves.
      fonts: [
        { name: "IBM Plex Sans", weight: 400, data: font("ibm-plex-sans", "ibm-plex-sans-latin-400-normal.woff") },
        { name: "Space Grotesk", weight: 400, data: font("space-grotesk", "space-grotesk-latin-400-normal.woff") },
        { name: "Space Grotesk", weight: 400, data: font("space-grotesk", "space-grotesk-latin-ext-400-normal.woff") },
      ],
    },
  )

  writeFileSync(pub("og-image.jpg"), await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toBuffer())
  console.log("Wrote public/og-image.jpg")
}

main()
