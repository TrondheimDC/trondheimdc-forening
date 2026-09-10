import Image from "next/image"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"

import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"

// Credits per docs/PHOTO-CREDITS.md.
const CREDIT_TERJE_TROBE = "© TDC - Tech from Trondheim, Terje Trobe"
const CREDIT_LYKT = "© TDC - Tech from Trondheim, LYKT Foto og Film"

const YEARS_2024 = [1, 3, 17, 22, 27, 145]
const LYKT_2025 = [6950, 7160, 6932, 7071, 7075, 7159]

const PHOTOS = [
  {
    src: "/img/photos/tdc-duck-clarion.jpg",
    alt: "TDC-duken utenfor Clarion Hotel Trondheim",
    portrait: true,
    credit: undefined,
  },
  ...LYKT_2025.map((n) => ({
    src: `/img/photos/tdc2025-lykt-${n}.jpg`,
    alt: "Fra TDC 2025",
    portrait: false,
    credit: CREDIT_LYKT,
  })),
  ...YEARS_2024.map((n) => ({
    src: `/img/photos/tdc2024-${n}.jpg`,
    alt: "Fra TDC 2024",
    portrait: false,
    credit: CREDIT_TERJE_TROBE,
  })),
]

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
            className={
              photo.portrait
                ? "relative h-40 flex-shrink-0 cursor-zoom-in overflow-hidden rounded-lg aspect-[3/4] sm:h-48"
                : "relative h-40 w-64 flex-shrink-0 cursor-zoom-in overflow-hidden rounded-lg sm:h-48 sm:w-80"
            }
          >
            <Image
              src={photo.src}
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
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "center" }}
      />
    </section>
  )
}
