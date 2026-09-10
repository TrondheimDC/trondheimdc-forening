"use client"

import { ExternalLink, Users } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { groups } from "@/data/groups"

export const GroupsIndex = () => {
  const { t } = useTranslation("common", { keyPrefix: "groups" })

  return (
    <section id="meetups" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl">{t("title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <a
              key={group.slug}
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-strong hover:bg-muted"
            >
              <div className="relative mb-4 aspect-video w-20 overflow-hidden rounded-lg bg-background p-1">
                {group.logo ? (
                  <Image
                    src={group.logo}
                    alt={group.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Users className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {group.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("visit")}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}

          <a
            href={`mailto:${t("addYours.cta")}`}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong p-5 text-center transition-colors hover:bg-muted"
          >
            <h3 className="text-lg font-semibold">{t("addYours.title")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("addYours.body")}
            </p>
            <span className="mt-4 text-sm font-medium text-primary">
              {t("addYours.cta")}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
