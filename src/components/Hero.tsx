"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { groups } from "@/data/groups"
import { cn } from "@/lib/utils"

type Slot = {
  className: string
  // Placement below `xl`, where the centred text column eats nearly the full
  // width. Slots live in the hero's fixed py-28 padding bands (top/bottom) and
  // bleed off the left/right edges, which the section's overflow-hidden clips.
  // Offsets are fixed rather than percentage-based so they stay inside those
  // bands no matter how far the copy wraps.
  mobileClassName: string
  // Mirrors the `hidden md:block` in `mobileClassName`, which is what actually
  // does the hiding; this is the half the tile dealer can read. Keep the two
  // in step.
  hiddenOnPhones?: true
  // Negative: an offset into the float cycle, so the stagger costs no wait.
  delay: string
  rotate: string
}

// Where the tiles sit: three a side, ordered top-to-bottom down the left edge
// and then down the right. Kept free of any particular logo, because which one
// lands in which slot is decided per visit rather than here.
const slots: Slot[] = [
  {
    className: "left-[5%] top-[12%] aspect-video w-32",
    mobileClassName: "-left-4 top-5 aspect-video w-24",
    delay: "0s",
    rotate: "-6deg",
  },
  {
    // Held nearer the edge than the corner slots look like they need: at
    // exactly `xl` the 768px copy column leaves only 256px a side, and this is
    // the row that would otherwise reach into it.
    className: "left-[8%] top-[46%] aspect-video w-32",
    // The two middle slots are the ones a phone has no room for. Above `md`
    // they drop into the leftover space in the top and bottom bands, which is
    // why neither keeps the side it has on desktop.
    mobileClassName: "hidden md:block left-[34%] top-8 aspect-video w-24",
    hiddenOnPhones: true,
    delay: "-1.5s",
    rotate: "4deg",
  },
  {
    className: "left-[3%] bottom-[14%] aspect-video w-32",
    mobileClassName: "-left-5 bottom-11 aspect-video w-24",
    delay: "-1.1s",
    rotate: "3deg",
  },
  {
    className: "right-[6%] top-[11%] aspect-video w-32",
    mobileClassName: "-right-4 top-6 aspect-video w-24",
    delay: "-1.8s",
    rotate: "5deg",
  },
  {
    className: "right-[7%] top-[52%] aspect-video w-32",
    mobileClassName: "hidden md:block right-[20%] bottom-7 aspect-video w-24",
    hiddenOnPhones: true,
    delay: "-2.7s",
    rotate: "-5deg",
  },
  {
    className: "right-[4%] bottom-[18%] aspect-video w-32",
    mobileClassName: "-right-5 bottom-6 aspect-video w-24",
    delay: "-0.4s",
    rotate: "-4deg",
  },
]

type Tile = { src: string; slot: Slot }

const TDC_LOGO = "/img/logos/tdc.webp"

// Every group that has a logo is a candidate, so adding one to the index puts
// it into the hero rotation too. dotFEMMES has no logo and drops out.
const groupLogos = groups.flatMap((group) => group.logo ?? [])

// Sorting on a random key rather than swapping in place: it leaves the input
// untouched, which matters because what gets handed in are module-level
// constants the rest of the page reads too.
function shuffled<T>(items: readonly T[]): T[] {
  return items
    .map((item) => ({ item, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item)
}

// One tile per slot: the TDC mark plus a group logo for every other slot, with
// both the cast and the positions redrawn on each visit. Six slots against
// seven candidates means one group sits out per visit, and which one does is
// part of the shuffle.
function dealTiles(): Tile[] {
  const logos = shuffled(groupLogos)

  // TDC is drawn only from the slots a phone actually shows, so "TDC is always
  // on screen" holds at every width and not just above `md`.
  const onPhones = slots.filter((slot) => !slot.hiddenOnPhones)
  const tdcSlot = onPhones[Math.floor(Math.random() * onPhones.length)]

  // Walks the slots and takes from the shuffled pile, so a pool that ever runs
  // shorter than the slot count just leaves the leftover slots empty rather
  // than rendering a hole.
  return slots.flatMap((slot) => {
    if (slot === tdcSlot) return [{ src: TDC_LOGO, slot }]
    const src = logos.pop()
    return src ? [{ src, slot }] : []
  })
}

// Purely decorative: the TDC mark plus group logos that also appear (as real
// links) in the Groups section below, so these carry no link and are hidden
// from assistive tech rather than announced as unlabeled images. `placement`
// is the only thing that differs between the desktop and below-xl scatters.
function HeroTile({
  src,
  slot,
  placement,
}: {
  src: string
  slot: Slot
  placement: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-float absolute overflow-hidden rounded-2xl border border-border bg-card shadow-lg",
        placement,
      )}
      // The tilt is a plain style so it is present on the very first paint;
      // only the vertical drift is animated. The delay is negative so each
      // tile starts mid-cycle instead of sitting still until its turn comes.
      style={{ animationDelay: slot.delay, rotate: slot.rotate }}
    >
      {/* Eager, not next/image's default lazy: these sit above the fold, so
          deferring them just means the tiles paint empty and fill in later.
          Not `priority`: both scatters render the same six sources, and a
          preload link per copy would be twelve hints for six files. */}
      <Image
        src={src}
        alt=""
        fill
        loading="eager"
        // cover, not contain: box-sizing means the 1px border leaves a 126x70
        // inner box, so a 16:9 image letterboxes and leaks bg-card down the sides.
        className="object-cover"
      />
    </div>
  )
}

export const Hero = () => {
  const { t } = useTranslation("common", { keyPrefix: "hero" })

  // Dealt after mount rather than during render. The site is a static export,
  // so a shuffle that ran during render would be frozen into the prerendered
  // HTML at build time and served to everyone, with React then hydrating over
  // a second, different shuffle. Waiting for the client costs the scatter a
  // beat behind the copy, which is why it fades rather than snaps in; the
  // tiles are decorative, so that is the cheaper side of the trade.
  const [tiles, setTiles] = useState<Tile[]>([])

  useEffect(() => setTiles(dealTiles()), [])

  return (
    <section className="relative overflow-hidden">
      {/* Luminosity over a white backdrop turns the photo into plain
          greyscale, so the veil that reads as a soft haze on black leaves
          dark photo detail sitting under dark body copy instead. Light mode
          keeps the photo at full strength and instead leans on the copy scrim
          below, which is the layer that actually has to carry contrast. */}
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
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background light:via-background/30"
      />
      {/* Copy scrim: an ellipse that settles the backdrop under the copy
          alone, so the photo keeps its detail out at the edges where the
          tiles float. Partial rather than solid, so the photo still shows
          through behind the text.

          Its box has to be wider than the copy it covers, because the radii
          stop at 50%: the ellipse then reaches transparent exactly at the box
          edge, so the box's straight sides never show up as seams, but the
          falloff has to start outside the text rather than through it. The
          copy column is min(100vw, 768px), and 150% capped at 1024px stays
          clear of it at every width. A percentage of the section, the obvious
          thing to reach for, does not: the column is full-bleed on a phone
          and a fixed 768px on a wide desktop.

          Above the photo but below the tiles, hence its own layer rather than
          a background on the copy column itself. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-[150%] max-w-5xl -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--hero-scrim)_0%,var(--hero-scrim)_25%,transparent_100%)]"
      />

      {/* The fade is on the scatter, not on each tile: `animate-in` and
          `animate-float` both drive `animation`, so a tile cannot run both. */}
      <div className="pointer-events-none absolute inset-0 hidden animate-in fade-in-0 xl:block">
        {tiles.map(({ src, slot }) => (
          <HeroTile
            key={slot.className}
            src={src}
            slot={slot}
            placement={slot.className}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 animate-in fade-in-0 xl:hidden">
        {tiles.map(({ src, slot }) => (
          <HeroTile
            key={`sm-${slot.className}`}
            src={src}
            slot={slot}
            placement={slot.mobileClassName}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-28 text-center sm:px-6 sm:py-36">
        <p className="text-sm font-medium uppercase tracking-wider text-foreground">
          {t("kicker")}
        </p>
        <h1 className="text-display">{t("title")}</h1>
        <p className="text-balance text-lg text-foreground">{t("subtitle")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="#communities">{t("ctaGroups")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/stotte">{t("ctaStotte")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
