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
  // The only square source in the set. The grid and the hero tiles both put
  // these in a 16:9 box, so it gets cropped to match rather than rendered as
  // a letterboxed square among six landscape logos. Ferris sits just below
  // the middle of the frame, which a centred crop keeps.
  { src: "public/img/groups/rust-trondheim.jpeg", width: 320, height: 180 },
  { src: "public/img/groups/spillmakerlauget-midt.jpeg", width: 320 },

  // Archive screenshots. The grid tops out at four columns inside a
  // `max-w-6xl`, so a card is ~270px wide; these are 1280px-wide captures.
  ...[
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2023, 2024, 2025, 2026,
  ].map((year) => ({ src: `public/img/archive/${year}.jpg`, width: 640 })),
  { src: "public/img/archive/2026-dark.jpg", width: 640 },
  // Not a screenshot but a static graphic — see the note in data/archive.ts.
  { src: "public/img/archive/2021.png", width: 640 },

  // Strip photos. These are the one place two sizes are worth it: the strip
  // shows them ~320px wide, but clicking one opens it full-screen in the
  // lightbox, so `thumb` gets a second, much smaller copy for the strip and
  // the .webp itself stays big enough to fill a viewport.
  ...[
    "tdc-duck-clarion",
    "tdc2024-1",
    "tdc2024-3",
    "tdc2024-17",
    "tdc2024-22",
    "tdc2024-27",
    "tdc2024-145",
    "tdc2025-lykt-6932",
    "tdc2025-lykt-6950",
    "tdc2025-lykt-7071",
    "tdc2025-lykt-7075",
    "tdc2025-lykt-7159",
    "tdc2025-lykt-7160",
  ].map((name) => ({
    src: `public/img/photos/${name}.jpg`,
    width: 1600,
    quality: 78,
    thumb: 640,
  })),
]

const kb = (bytes) => `${Math.round(bytes / 1024)}K`

// `withoutEnlargement` so a source narrower than the target is only
// re-encoded, never upscaled. A `height` opts into a centred crop to that
// exact box; without one the source's own aspect ratio is kept.
const write = (src, dest, width, quality, height) =>
  sharp(src)
    .resize({ width, height, withoutEnlargement: !height, fit: height ? "cover" : "inside" })
    .webp({ quality })
    .toFile(dest)

for (const { src, width, height, quality = 80, thumb } of IMAGES) {
  const dest = src.replace(/\.[^.]+$/, ".webp")
  const before = statSync(src).size
  const { size: after } = await write(src, dest, width, quality, height)
  console.log(`ok   ${src} ${kb(before)} -> ${dest} ${kb(after)}`)

  if (thumb) {
    const thumbDest = dest.replace(/\.webp$/, "-thumb.webp")
    // Lower quality than the full copy: at strip size the artefacts are
    // invisible, and these are grainy low-light photos that webp spends a lot
    // of bytes on otherwise.
    const { size } = await write(src, thumbDest, thumb, 62)
    console.log(`ok   ${src} ${kb(before)} -> ${thumbDest} ${kb(size)}`)
  }
}
