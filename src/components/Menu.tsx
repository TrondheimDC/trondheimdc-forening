"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const NAV_LINKS = [
  { href: "/#meetups", key: "groups" as const },
  { href: "/#arkiv", key: "archive" as const },
  { href: "/stotte", key: "stotte" as const },
]

export const Menu = () => {
  const { t, i18n } = useTranslation("common", { keyPrefix: "menu" })

  const handleLanguageChange = (lang: "no" | "en") => {
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang)
    }
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-49 h-16 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/logos/TDC_white.svg"
            alt="TrondheimDC"
            width={74}
            height={30}
            priority
            className="invert-0 light:invert"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleLanguageChange("no")}
            className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            data-active={i18n.language === "no"}
          >
            NO
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange("en")}
            className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            data-active={i18n.language === "en"}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
