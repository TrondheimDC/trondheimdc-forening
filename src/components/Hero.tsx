"use client"

import Image from "next/image"
import Link from "next/link"
import type * as React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { groups } from "@/data/groups"
import { cn } from "@/lib/utils"

type Tile = {
  src: string
  alt: string
  // Extra classes for the image itself, for assets that don't sit well on
  // bg-card: the TDC mark is solid white and needs the same light-theme
  // inversion the nav logo uses, and the NNUG logo is transparent where the
  // other group logos are opaque JPEGs.
  imgClassName?: string
  className: string
  // Placement below `lg`, where the centred text column eats nearly the full
  // width. Tiles live in the hero's fixed py-28 padding bands (top/bottom) and
  // bleed off the left/right edges, which the section's overflow-hidden clips.
  // Offsets are fixed rather than percentage-based so they stay inside those
  // bands no matter how far the copy wraps. Omitted = desktop-only.
  mobileClassName?: string
  delay: string
  rotate: string
}

const tiles: Tile[] = [
  {
    // Logo viewBox is 297x121 — a wide chip, not a square tile.
    src: "/img/logos/TDC_white.svg",
    alt: "TrondheimDC",
    imgClassName: "invert-0 light:invert",
    className: "left-[5%] top-[14%] aspect-[297/121] w-36 p-3",
    mobileClassName: "-left-4 top-5 aspect-[297/121] w-28 p-2.5",
    delay: "0s",
    rotate: "-6deg",
  },
  {
    src: "/img/groups/nnug-trondheim.png",
    alt: groups[2]?.name ?? "",
    imgClassName: groups[2]?.logoNeedsWhiteBg ? "bg-white" : undefined,
    className: "right-[6%] top-[13%] aspect-square w-16 p-2",
    mobileClassName: "-right-4 top-6 aspect-square w-14 p-1.5",
    delay: "1.8s",
    rotate: "5deg",
  },
  {
    src: "/img/groups/javabin-trondheim.jpeg",
    alt: groups[0]?.name ?? "",
    className: "right-[4%] bottom-[20%] aspect-video w-32 p-1.5",
    mobileClassName: "-right-5 bottom-6 aspect-video w-24 p-1",
    delay: "0.4s",
    rotate: "-4deg",
  },
  {
    src: "/img/groups/bartjs.jpeg",
    alt: groups[1]?.name ?? "",
    className: "left-[3%] bottom-[16%] aspect-video w-32 p-1.5",
    mobileClassName: "-left-5 bottom-11 aspect-video w-24 p-1",
    delay: "1.1s",
    rotate: "3deg",
  },
  {
    src: "/img/groups/ixda-trondheim.jpeg",
    alt: groups[4]?.name ?? "",
    className: "left-[14%] top-[54%] aspect-video w-28 p-1.5",
    // Held back on phones (too crowded); fills the empty middle of the
    // bottom band once there is room for it.
    mobileClassName:
      "hidden md:block right-[20%] bottom-7 aspect-video w-20 p-1",
    delay: "1.5s",
    rotate: "4deg",
  },
]

// Purely decorative — the TDC mark plus group logos that also appear (as real
// links) in the Groups section below, so these carry no link and are hidden
// from assistive tech rather than announced as unlabeled images. `placement`
// is the only thing that differs between the desktop and below-lg scatters.
function HeroTile({ tile, placement }: { tile: Tile; placement: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-float absolute rounded-2xl border border-border bg-card shadow-lg",
        placement,
      )}
      style={
        {
          animationDelay: tile.delay,
          "--tile-rotate": tile.rotate,
        } as React.CSSProperties
      }
    >
      <Image
        src={tile.src}
        alt=""
        fill
        className={cn("rounded-[inherit] object-contain", tile.imgClassName)}
      />
    </div>
  )
}

export const Hero = () => {
  const { t } = useTranslation("common", { keyPrefix: "hero" })

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center [mix-blend-mode:luminosity]"
        style={{ backgroundImage: "url(/img/hero-background.png)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-primary/25 [mix-blend-mode:color]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background"
      />

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {tiles.map((tile) => (
          <HeroTile
            key={tile.alt + tile.className}
            tile={tile}
            placement={tile.className}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 lg:hidden">
        {tiles
          .filter((tile) => tile.mobileClassName)
          .map((tile) => (
            <HeroTile
              key={`sm-${tile.alt}-${tile.className}`}
              tile={tile}
              placement={tile.mobileClassName as string}
            />
          ))}
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-28 text-center sm:px-6 sm:py-36">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {t("kicker")}
        </p>
        <h1 className="text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="text-balance text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="#meetups">{t("ctaGroups")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/stotte">{t("ctaStotte")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
