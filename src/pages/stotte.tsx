import Head from "next/head"
import { useTranslation } from "react-i18next"

const Stotte = () => {
  const { t } = useTranslation("common", { keyPrefix: "stotte" })

  const criteria = t("criteria", { returnObjects: true }) as string[]
  const categories = t("categories", { returnObjects: true }) as string[]

  return (
    <>
      <Head>
        <title>{`TrondheimDC | ${t("title")}`}</title>
      </Head>
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("intro")}</p>

        <h2 className="mt-10 text-xl">{t("criteriaTitle")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {criteria.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl">{t("categoriesTitle")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {categories.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl">{t("closingTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("closing")}</p>
          <a
            href={`mailto:${t("email")}`}
            className="mt-4 inline-block font-medium text-primary hover:underline"
          >
            {t("email")}
          </a>
        </div>

        <div className="mt-6 rounded-xl border border-border p-6">
          <h2 className="text-xl">{t("reimburseTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("reimburseBody")}</p>
          <a
            href="https://utlegg.trondheimdc.no"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-medium text-primary hover:underline"
          >
            {t("reimburseCta")}
          </a>
        </div>
      </div>
    </>
  )
}

export default Stotte
