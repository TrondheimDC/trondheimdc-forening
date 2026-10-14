// The link preview image for Slack, LinkedIn, Facebook and so on. Next renders
// it once at build time and adds the og:image tags to every page.
// Satori does the rendering and supports a subset of CSS: every element with
// more than one child needs display: flex. https://github.com/vercel/satori#css
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import sharp from "sharp"
import { no, OG_IMAGE } from "@/lib/metadata"

export const alt = OG_IMAGE.alt
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height }
export const contentType = "image/png"
// Required with output: "export"; the image is rendered once at build time.
export const dynamic = "force-static"

const PADDING = { x: 80, y: 72 }

const file = (...path: string[]) => readFile(join(process.cwd(), ...path))
// Satori reads woff and ttf, not the woff2 the site serves.
const font = (pkg: string, name: string) =>
  file("node_modules/@fontsource", pkg, "files", `${name}.woff`)
const dataUrl = (type: string, data: Buffer) =>
  `data:${type};base64,${data.toString("base64")}`

export default async function Image() {
  // The logo is stacked blocks that only just touch; a hairline stroke closes
  // the anti-aliasing seams that otherwise show between them.
  const logo = (await file("public/img/logos/TDC_white.svg"))
    .toString()
    .replaceAll(
      'fill="white"',
      'fill="white" stroke="white" stroke-width="0.8"',
    )
  // Satori doesn't decode WebP, so hand it a PNG of the hero backdrop.
  const background = await sharp(await file("public/img/hero-background.webp"))
    .png()
    .toBuffer()

  return new ImageResponse(
    <div
      style={{
        // Satori adds padding on top of width/height, so size the content box.
        width: size.width - 2 * PADDING.x,
        height: size.height - 2 * PADDING.y,
        boxSizing: "content-box",
        padding: `${PADDING.y}px ${PADDING.x}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fefefe",
        fontFamily: "IBM Plex Sans",
        backgroundColor: "#0f0f0f",
        // The hero's backdrop, darkened the way the site does it so the copy reads.
        backgroundImage: `linear-gradient(rgba(15,15,15,0.55), rgba(15,15,15,0.85)), url(${dataUrl("image/png", background)})`,
        backgroundSize: "100% 100%, cover",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: Satori renders plain <img>, not next/image */}
      <img
        src={dataUrl("image/svg+xml", Buffer.from(logo))}
        height={92}
        width={226}
        alt=""
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Space Grotesk",
            fontSize: 76,
            lineHeight: 1.05,
            color: "#9bf7a9",
            marginBottom: 20,
          }}
        >
          {no.hero.kicker}
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.4, maxWidth: 1040 }}>
          {no.hero.subtitle}
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#c4c4c4" }}>
        forening.trondheimdc.no
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Sans",
          weight: 400,
          data: await font("ibm-plex-sans", "ibm-plex-sans-latin-400-normal"),
        },
        {
          name: "Space Grotesk",
          weight: 400,
          data: await font("space-grotesk", "space-grotesk-latin-400-normal"),
        },
        {
          name: "Space Grotesk",
          weight: 400,
          data: await font(
            "space-grotesk",
            "space-grotesk-latin-ext-400-normal",
          ),
        },
      ],
    },
  )
}
