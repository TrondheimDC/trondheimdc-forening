"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { groups } from "@/data/groups"
import { cn } from "@/lib/utils"

type Tile = {
  src: string
  alt: string
  className: string
  // Placement below `lg`, where the centred text column eats nearly the full
  // width. Tiles live in the hero's fixed py-28 padding bands (top/bottom) and
  // bleed off the left/right edges, which the section's overflow-hidden clips.
  // Offsets are fixed rather than percentage-based so they stay inside those
  // bands no matter how far the copy wraps. Omitted = desktop-only.
  mobileClassName?: string
  // Negative: an offset into the float cycle, so the stagger costs no wait.
  delay: string
  rotate: string
}

const tiles: Tile[] = [
  {
    src: "/img/logos/tdc.webp",
    alt: "TrondheimDC",
    className: "left-[5%] top-[14%] aspect-video w-32",
    mobileClassName: "-left-4 top-5 aspect-video w-24",
    delay: "0s",
    rotate: "-6deg",
  },
  {
    src: "/img/groups/nnug-trondheim.webp",
    alt: groups[2]?.name ?? "",
    className: "right-[6%] top-[13%] aspect-video w-32",
    mobileClassName: "-right-4 top-6 aspect-video w-24",
    delay: "-1.8s",
    rotate: "5deg",
  },
  {
    src: "/img/groups/javabin-trondheim.webp",
    alt: groups[0]?.name ?? "",
    className: "right-[4%] bottom-[20%] aspect-video w-32",
    mobileClassName: "-right-5 bottom-6 aspect-video w-24",
    delay: "-0.4s",
    rotate: "-4deg",
  },
  {
    src: "/img/groups/bartjs.webp",
    alt: groups[1]?.name ?? "",
    className: "left-[3%] bottom-[16%] aspect-video w-32",
    mobileClassName: "-left-5 bottom-11 aspect-video w-24",
    delay: "-1.1s",
    rotate: "3deg",
  },
  {
    src: "/img/groups/ixda-trondheim.webp",
    alt: groups[4]?.name ?? "",
    className: "left-[14%] top-[54%] aspect-video w-32",
    // Held back on phones (too crowded); fills the empty middle of the
    // bottom band once there is room for it.
    mobileClassName: "hidden md:block right-[20%] bottom-7 aspect-video w-24",
    delay: "-1.5s",
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
      // The tilt is a plain style so it is present on the very first paint;
      // only the vertical drift is animated. The delay is negative so each
      // tile starts mid-cycle instead of sitting still until its turn comes.
      style={{ animationDelay: tile.delay, rotate: tile.rotate }}
    >
      {/* Eager, not next/image's default lazy: these sit above the fold, so
          deferring them just means the tiles paint empty and fill in later.
          Not `priority` — both scatters render the same five sources, and a
          preload link per copy would be nine hints for five files. */}
      <Image
        src={tile.src}
        alt=""
        fill
        loading="eager"
        className="rounded-[inherit] object-contain"
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
        style={{ backgroundImage: "url(/img/hero-background.webp)" }}
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
