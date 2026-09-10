import { statSync } from "node:fs"
import sharp from "sharp"

// Static export means `images: { unoptimized: true }`, so whatever is in
// public/ ships byte-for-byte. These sources are photo-sized while the site
// renders most of them at a couple of hundred pixels, so we keep a hand-made
// web copy next to each original: same path, same basename, .webp extension.
// The originals stay in the repo untouched — nothing references them, but they
// are what to re-run this against if a size or crop ever needs to change.
//
// Widths are ~2x the largest CSS size the asset is displayed at, for retina.
const IMAGES = [
  // Full-bleed hero backdrop. Not narrowed: 1440 is already less than a wide
  // desktop viewport. It only needs the re-encode, and it sits under a
  // luminosity blend plus a gradient, so fine detail is invisible anyway.
  { src: "public/img/hero-background.png", width: 1440, quality: 72 },

  // Group logos: `w-32` (128px) in the hero tiles, `w-20` (80px) in the
  // groups grid.
  { src: "public/img/logos/tdc.jpg", width: 320 },
  { src: "public/img/groups/bartjs.jpeg", width: 320 },
  { src: "public/img/groups/ixda-trondheim.jpeg", width: 320 },
  { src: "public/img/groups/javabin-trondheim.jpeg", width: 320 },
  { src: "public/img/groups/nnug-trondheim.jpg", width: 320 },
]

const kb = (bytes) => `${Math.round(bytes / 1024)}K`

for (const { src, width, quality = 80 } of IMAGES) {
  const dest = src.replace(/\.[^.]+$/, ".webp")
  const before = statSync(src).size
  const { size: after } = await sharp(src)
    // `withoutEnlargement` so a source narrower than the target is only
    // re-encoded, never upscaled.
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest)
  console.log(`ok   ${src} ${kb(before)} -> ${dest} ${kb(after)}`)
}
