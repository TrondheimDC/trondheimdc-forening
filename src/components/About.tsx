"use client"

import { useTranslation } from "react-i18next"

export const About = () => {
  const { t } = useTranslation("common", { keyPrefix: "about" })

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl">{t("title")}</h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </div>
    </section>
  )
}
