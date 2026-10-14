"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { archiveYears } from "@/data/archive"
import { cn } from "@/lib/utils"

export const Archive = () => {
  const { t } = useTranslation("common", { keyPrefix: "archive" })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="arkiv" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2>{t("title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {archiveYears.map((entry) => {
            const isCurrent = entry.year === 2026
            const badge = entry.note
              ? t(entry.note)
              : isCurrent
                ? t("current")
                : null

            if (!entry.image) {
              return (
                <div
                  key={entry.year}
                  className="flex aspect-[8/5] flex-col items-center justify-center rounded-lg border border-dashed border-border-strong text-center text-muted-foreground"
                >
                  <span className="text-lg font-semibold">{entry.year}</span>
                  <span className="mt-1 px-2 text-[11px] text-muted-foreground">
                    {badge}
                  </span>
                </div>
              )
            }

            const image =
              mounted && resolvedTheme === "dark" && entry.darkImage
                ? entry.darkImage
                : entry.image

            const card = (
              <>
                <Image
                  src={image}
                  alt={t("screenshotAlt", { year: entry.year })}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-2">
                  <span className="text-sm font-semibold text-white">
                    {entry.year}
                  </span>
                  {badge && (
                    <span className="ml-2 text-[11px] text-primary">
                      {badge}
                    </span>
                  )}
                </div>
              </>
            )

            const cardClasses = cn(
              "group relative aspect-[8/5] overflow-hidden rounded-lg border border-border transition-colors",
              isCurrent && "ring-2 ring-primary",
              entry.url && "hover:border-border-strong",
            )

            if (!entry.url) {
              return (
                <div key={entry.year} className={cardClasses}>
                  {card}
                </div>
              )
            }

            return (
              <a
                key={entry.year}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                {card}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
