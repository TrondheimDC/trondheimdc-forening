"use client"

import Image from "next/image"
import Link from "next/link"
import type { SVGProps } from "react"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const NAV_LINKS = [
  { href: "/#meetups", key: "groups" as const },
  { href: "/#arkiv", key: "archive" as const },
  { href: "/stotte", key: "stotte" as const },
]

// The desktop row deliberately leaves Vedtekter out, but the panel has the
// room for it and it is otherwise only reachable from the footer.
const MOBILE_NAV_LINKS = [
  ...NAV_LINKS,
  { href: "/vedtekter", key: "vedtekter" as const },
]

const MOBILE_NAV_ID = "mobile-nav"

function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export const Menu = () => {
  const { t, i18n } = useTranslation("common", { keyPrefix: "menu" })
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const handleLanguageChange = (lang: "no" | "en") => {
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang)
    }
  }

  // Escape closes the panel and hands focus back to the button that opened
  // it, so a keyboard user never ends up focused on a removed element.
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

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
            aria-pressed={i18n.language === "no"}
            lang="no"
          >
            NO
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange("en")}
            className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            data-active={i18n.language === "en"}
            aria-pressed={i18n.language === "en"}
            lang="en"
          >
            EN
          </button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            aria-expanded={open}
            aria-controls={MOBILE_NAV_ID}
            aria-label={t("toggle")}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            {open ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Sits directly under the 64px header. `absolute` resolves against the
          fixed <nav>, so the panel is never clipped by the header's own
          height and the page keeps scrolling underneath it. Opaque
          background: the header's translucency would make the links sit on
          top of whatever content happens to scroll past. */}
      {open && (
        <div
          id={MOBILE_NAV_ID}
          className="absolute inset-x-0 top-16 border-b border-border bg-background shadow-lg animate-in fade-in-0 slide-in-from-top-2 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {MOBILE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // Most of these are hash links on the page you are already
                // on, where no route change fires, so the click itself is
                // what closes the panel.
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
