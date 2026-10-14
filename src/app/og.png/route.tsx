// The link preview image for Slack, LinkedIn, Facebook and so on, served as
// /og.png. A Route Handler in a folder named like a file is exported as that
// file (docs: guides/static-exports), so it gets a real .png name and nginx
// sends the right Content-Type without any special config. Next's
// opengraph-image.tsx convention would export it without an extension.
// pageMetadata() in src/lib/metadata.ts points every page's og:image here.
// Satori does the rendering and supports a subset of CSS: every element with
// more than one child needs display: flex. https://github.com/vercel/satori#css
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import sharp from "sharp"
import { no, OG_IMAGE } from "@/lib/metadata"

// Required with output: "export"; the image is rendered once at build time.
export const dynamic = "force-static"

const size = { width: OG_IMAGE.width, height: OG_IMAGE.height }

const PADDING = { x: 80, y: 72 }

const file = (...path: string[]) => readFile(join(process.cwd(), ...path))
// Satori reads woff and ttf, not the woff2 the site serves.
const font = (pkg: string, name: string) =>
  file("node_modules/@fontsource", pkg, "files", `${name}.woff`)
const dataUrl = (type: string, data: Buffer) =>
  `data:${type};base64,${data.toString("base64")}`

export async function GET() {
  // trondheimdc.no's wordmark in its dark-theme green, as in the site header.
  const letters = await Promise.all(
    ["T-green", "D-green-long", "C-green"].map(async (name) =>
      dataUrl(
        "image/svg+xml",
        await file("public/img/logos/letters", `${name}.svg`),
      ),
    ),
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
      <div style={{ display: "flex", gap: 13 }}>
        {letters.map((src, i) => (
          // biome-ignore lint/performance/noImgElement: Satori renders plain <img>, not next/image
          <img
            key={src}
            src={src}
            height={92}
            width={[71, 272, 71][i]}
            alt=""
          />
        ))}
      </div>
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
