"use client"

import Image from "next/image"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"

// Credits per docs/PHOTO-CREDITS.md.
const CREDIT_TERJE_TROBE = "© TDC - Tech from Trondheim, Terje Trobe"
const CREDIT_LYKT = "© TDC - Tech from Trondheim, LYKT"

const YEARS_2024 = [1, 3, 17, 22, 27]
const LYKT_2025 = [7160, 6932, 7071, 7075, 7159]

const PHOTOS = [
  {
    src: "/img/photos/tdc-duck-clarion.webp",
    alt: "TDC-duken utenfor Clarion Hotel Trondheim",
    portrait: true,
    credit: undefined,
  },
  {
    src: "/img/photos/tdc2026-komite.webp",
    alt: "Programkomiteen 2026 foran TDC-duken",
    portrait: false,
    credit: CREDIT_LYKT,
  },
  ...LYKT_2025.map((n) => ({
    src: `/img/photos/tdc2025-lykt-${n}.webp`,
    alt: "Fra TDC 2025",
    portrait: false,
    credit: CREDIT_LYKT,
  })),
  ...YEARS_2024.map((n) => ({
    src: `/img/photos/tdc2024-${n}.webp`,
    alt: "Fra TDC 2024",
    portrait: false,
    credit: CREDIT_TERJE_TROBE,
  })),
]

// The strip renders these ~320px wide but the lightbox blows them up to fill
// the viewport, so scripts/optimize-images.mjs writes two copies of each and
// the strip asks for the small one.
const thumb = (src: string) => src.replace(/\.webp$/, "-thumb.webp")

export const PhotoStrip = () => {
  const [index, setIndex] = useState(-1)

  return (
    <section className="border-t border-border">
      <div className="flex gap-3 overflow-x-auto px-4 py-8 sm:px-6">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            // photo.alt repeats across the strip ("Fra TDC 2025" x6, "Fra TDC
            // 2024" x6), so on its own it leaves every button with the same
            // accessible name and no indication it opens a full-size viewer.
            aria-label={`Forstørr bilde ${i + 1} av ${PHOTOS.length}: ${photo.alt}`}
            lang="no"
            className={
              photo.portrait
                ? "relative h-40 flex-shrink-0 cursor-zoom-in overflow-hidden rounded-lg aspect-[3/4] sm:h-48"
                : "relative h-40 w-64 flex-shrink-0 cursor-zoom-in overflow-hidden rounded-lg sm:h-48 sm:w-80"
            }
          >
            <Image
              src={thumb(photo.src)}
              alt={photo.alt}
              lang="no"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={PHOTOS.map((photo) => ({
          src: photo.src,
          alt: photo.alt,
          description: photo.credit,
        }))}
        plugins={[Captions, Zoom]}
        captions={{ descriptionTextAlign: "center" }}
        // Pinch and double-tap on touch, buttons and wheel on desktop. The
        // default cap is 1 image pixel per screen pixel, which on a phone
        // barely zooms a 1600px photo, so allow a bit past that.
        zoom={{ maxZoomPixelRatio: 2 }}
      />
    </section>
  )
}
