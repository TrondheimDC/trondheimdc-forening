import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Seo } from "@/components/Seo"

// Deliberately evergreen: the page is meant to sit up between conferences as
// standing information, so the only thing that goes stale is the date, which
// lives in a single `communityStand.date` key per locale.
const CommunityStand = () => {
  const { t } = useTranslation("common", { keyPrefix: "communityStand" })

  const get = t("get", { returnObjects: true }) as string[]
  const expect = t("expect", { returnObjects: true }) as string[]

  return (
    <>
      <Seo
        title={t("title")}
        description={t("intro")}
        path="/community-stand"
      />
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("intro")}</p>
        <p className="mt-4 text-muted-foreground">
          {t("offer", { date: t("date") })}
        </p>

        <h2 className="mt-10 text-xl">{t("getTitle")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {get.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl">{t("expectTitle")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {expect.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl">{t("signupTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("signup")}</p>
          <a
            href={`mailto:${t("email")}`}
            className="mt-4 inline-block font-medium text-primary hover:underline"
          >
            {t("email")}
          </a>
        </div>

        <div className="mt-6 rounded-xl border border-border p-6">
          <h2 className="text-xl">{t("groupsTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("groupsBody")}</p>
          <Link
            href="/#communities"
            className="mt-4 inline-block font-medium text-primary hover:underline"
          >
            {t("groupsCta")}
          </Link>
        </div>
      </div>
    </>
  )
}

export default CommunityStand
