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
  href?: string
  className: string
  delay: string
  rotate: string
}

const tiles: Tile[] = [
  {
    src: "/img/logos/duck.svg",
    alt: "TDC-duck",
    className: "left-[4%] top-[16%] aspect-square w-16 p-3",
    delay: "0s",
    rotate: "-6deg",
  },
  {
    // Wordmark viewBox is 570x120 (~19:4) — a wide chip, not a square tile.
    src: "/img/logos/TDuckC_yellow.svg",
    alt: "TDuckC",
    className: "right-[6%] top-[12%] aspect-[19/4] w-40 rounded-lg p-3",
    delay: "0.8s",
    rotate: "5deg",
  },
  {
    src: "/img/groups/javabin-trondheim.jpeg",
    alt: groups[0]?.name ?? "",
    href: groups[0]?.url,
    className: "right-[4%] bottom-[20%] aspect-video w-32 p-1.5",
    delay: "0.4s",
    rotate: "-4deg",
  },
  {
    src: "/img/groups/bartjs.jpeg",
    alt: groups[1]?.name ?? "",
    href: groups[1]?.url,
    className: "left-[3%] bottom-[16%] aspect-video w-32 p-1.5",
    delay: "1.1s",
    rotate: "3deg",
  },
  {
    src: "/img/groups/nnug-trondheim.png",
    alt: groups[2]?.name ?? "",
    href: groups[2]?.url,
    className: "right-[16%] top-[54%] aspect-square w-16 p-2",
    delay: "1.8s",
    rotate: "-3deg",
  },
  {
    src: "/img/groups/ixda-trondheim.jpeg",
    alt: groups[4]?.name ?? "",
    href: groups[4]?.url,
    className: "left-[14%] top-[54%] aspect-video w-28 p-1.5",
    delay: "1.5s",
    rotate: "4deg",
  },
]

function HeroTile({ tile }: { tile: Tile }) {
  const content = (
    <div
      className={cn(
        "animate-float absolute rounded-2xl border border-border bg-card shadow-lg",
        tile.className,
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
        alt={tile.alt}
        fill
        className="rounded-[inherit] object-contain"
      />
    </div>
  )

  if (tile.href) {
    return (
      <a
        href={tile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tile.alt}
      >
        {content}
      </a>
    )
  }

  return content
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
          <div key={tile.alt + tile.className} className="pointer-events-auto">
            <HeroTile tile={tile} />
          </div>
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
