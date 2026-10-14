import "../styles/index.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Footer } from "@/components/Footer"
import { Menu } from "@/components/Menu"
import i18n from "@/i18n"

// Split out so useTranslation() runs inside I18nextProvider's subtree,
// rather than in the component that renders the provider itself.
const AppShell = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("common", { keyPrefix: "menu" })

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* The two faces that render above the fold everywhere: body copy and
            headings. Without these the browser only discovers the fonts after
            it has parsed the stylesheet, which is what makes the swap from the
            fallback visible. The remaining weights and the latin-ext subsets
            stay lazy. They are rarely, if ever, needed on first paint.
            Headings are 400, not 700: Tailwind's preflight resets h1-h6 to
            `font-weight: inherit`, so they inherit the body's weight and only
            the display family changes. Preloading Space Grotesk 700 here
            fetches a file no heading on the page asks for. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/ibm-plex-sans-latin-400-normal.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/space-grotesk-latin-400-normal.woff2"
          crossOrigin="anonymous"
        />
        {/* Rendered from public/icon.svg by scripts/build-icons.mjs. */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      {/* First focusable element on every page, invisible until a keyboard
          user tabs to it, then lets them jump past the header nav straight
          to the page content instead of tabbing through it every time. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t("skipToContent")}
      </a>
      <Menu />
      <main id="main-content" tabIndex={-1} className="pt-16 outline-none">
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

const MyApp = (props: AppProps) => (
  <I18nextProvider i18n={i18n}>
    <AppShell {...props} />
  </I18nextProvider>
)

export default MyApp
