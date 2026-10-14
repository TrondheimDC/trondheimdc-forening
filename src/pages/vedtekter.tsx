import { useTranslation } from "react-i18next"
import { Seo } from "@/components/Seo"

const SECTIONS = [
  { id: "1", title: "§1 Navn" },
  { id: "2", title: "§2 Formål" },
  { id: "3", title: "§3 Organisasjonsform" },
  { id: "4", title: "§4 Medlemskap" },
  { id: "5", title: "§5 Årsmøte" },
  { id: "6", title: "§6 Ekstraordinære årsmøte" },
  { id: "7", title: "§7 Styret" },
  { id: "8", title: "§8 Vedtektsendringer" },
  { id: "9", title: "§9 Oppløsning (kan ikke endres)" },
  { id: "10", title: "§10 Signatur" },
]

const Vedtekter = () => {
  const { t } = useTranslation("common", { keyPrefix: "vedtekter" })

  return (
    <>
      <Seo
        title={t("title")}
        description={t("description")}
        path="/vedtekter"
      />
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 lang="no" className="text-4xl">
          Vedtekter for TrondheimDC
        </h1>
        <p className="mt-4 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
          {t("note")}
        </p>

        <nav lang="no" aria-label="Innholdsfortegnelse" className="mt-8">
          <ol className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-primary hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div
          lang="no"
          className="prose-vedtekter mt-12 space-y-12 text-muted-foreground"
        >
          <section id="1" className="scroll-mt-20">
            <h2 className="text-foreground">§1 Navn</h2>
            <p>
              Foreningens registrerte navn er TrondheimDC, men forkortelsen TDC
              kan også brukes.
            </p>
          </section>

          <section id="2" className="scroll-mt-20">
            <h2 className="text-foreground">§2 Formål</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Foreningens formål er å arrangere en community-drevet og
                uavhengig konferanse med fokus på programvareutvikling i
                Trondheim og nærliggende områder. Programvareutvikling skal
                defineres bredt, og inkludere alle disipliner som inngår i
                programvareutvikling, inkludert, men ikke begrenset til design,
                utvikling, testing, vedlikehold, og ledelse.
              </li>
              <li>
                Foreningen skal støtte det lokale, frivillige IT-fagmiljøet
                gjennom finansielle støtteordninger, og fremme dets interesser.
              </li>
              <li>
                Foreningen har ingen kommersielle interesser og må ikke
                engasjere seg i aktiviteter som utelukkende tjener økonomiske
                formål. Foreningen opptrer ikke som representant for noen yrkes-
                eller næringsgruppe til fremme av dens økonomiske interesser.
                Foreningen og dens organer og hjelpemidler, må ikke brukes til
                arbeid for politiske eller forretningsmessige særinteresser.
              </li>
            </ol>
          </section>

          <section id="3" className="scroll-mt-20">
            <h2 className="text-foreground">§3 Organisasjonsform</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Foreningen er en frivillig, ideell og frittstående
                interesseorganisasjon uten bindinger til andre organisasjoner.
              </li>
              <li>
                Foreningen er en frittstående juridisk person med medlemmer, og
                er selveiende. At den er selveiende innebærer at ingen, verken
                medlemmer eller andre, har krav på foreningens formue eller
                eiendeler, eller er ansvarlig for gjeld eller andre
                forpliktelser.
              </li>
              <li>
                Det skal ikke utbetales godtgjøring til foreningens medlemmer.
                Dette er ikke til hinder for refusjon av faktiske utgifter som
                medlemmer har hatt på vegne av foreningen.
              </li>
            </ol>
          </section>

          <section id="4" className="scroll-mt-20">
            <h2 className="text-foreground">§4 Medlemskap</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Foreningen er åpen for alle som har en interesse i
                programvareutvikling og deler foreningens formål.
              </li>
              <li>
                Medlemskap i foreningen oppnås ved at man har hatt
                arrangørbillett til den til enhver tid sist arrangerte
                TDC-konferansen. Med arrangørbillett menes en billett tildelt
                personer som har hatt en aktiv rolle i planlegging, organisering
                og gjennomføring av TDC-konferansen. Arrangørbilletten kan ikke
                kjøpes.
              </li>
              <li>Medlemskap er personlig.</li>
              <li>Styret kan særskilt tildele medlemskap ved et vedtak.</li>
            </ol>
          </section>

          <section id="5" className="scroll-mt-20">
            <h2 className="text-foreground">§5 Årsmøte</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Årsmøtet er foreningens øverste organ og beslutningsmyndighet.
                Årsmøtet holdes hvert år innen slutten av juni og innkalles av
                styret med 1 måneds varsel med skriftlig melding til medlemmene.
                Melding kan sendes via digitale kanaler.
              </li>
              <li>Årsmøtet er åpent for alle medlemmer.</li>
              <li>
                Alle medlemmer har stemmerett og er valgbare til verv i
                foreningen.
              </li>
              <li>
                Årsmøtet er beslutningsdyktig med det antall stemmeberettigede
                medlemmer som møter, og alle medlemmer har én stemme. Hvis et
                medlem ikke kan delta på årsmøtet, kan skriftlig fullmakt gis
                til et annet medlem. Det er maks 1 fullmakt per medlem.
              </li>
              <li>Møteleder velges av årsmøtet.</li>
              <li>
                Forslag som skal behandles på årsmøtet skal være sendt til
                styret senest 2 uker før årsmøtet. Fullstendig saksliste må være
                tilgjengelig for medlemmene senest 1 uke før årsmøtet.
              </li>
              <li>
                Årsmøtet skal
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  <li>behandle foreningens årsmelding</li>
                  <li>behandle foreningens regnskap i revidert stand</li>
                  <li>behandle innkomne forslag</li>
                  <li>vedta foreningens budsjett</li>
                  <li>velge leder og styremedlemmer</li>
                </ol>
              </li>
            </ol>
          </section>

          <section id="6" className="scroll-mt-20">
            <h2 className="text-foreground">§6 Ekstraordinære årsmøte</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Ekstraordinære årsmøter blir avholdt når styret bestemmer det,
                eller minst 1/3 av medlemmene krever det.
              </li>
              <li>
                Møteinnkallelse og vedtak skjer etter samme regler som for
                ordinære årsmøter.
              </li>
            </ol>
          </section>

          <section id="7" className="scroll-mt-20">
            <h2 className="text-foreground">§7 Styret</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Foreningen har et styre bestående av minimum fem medlemmer.
              </li>
              <li>Styremedlemmer velges for to år av gangen.</li>
              <li>Styreverv er personlig.</li>
              <li>Styret er det øverste organ mellom årsmøtene.</li>
              <li>
                Styret skal holde møte når styreleder eller et flertall av
                styremedlemmene forlanger det.
              </li>
              <li>
                Styret kan fatte vedtak når et flertall av styrets medlemmer er
                til stede. Vedtak fattes med flertall av de avgitte stemmene.
              </li>
              <li>
                Stemmerett på styremøte er forbeholdt styrets medlemmer. I saker
                som omhandler arbeidsgrupper/utvalg har medlemmer av
                gruppen/utvalgets ledelse, møterett og talerett.
              </li>
              <li>
                Styret kan lukke dørene i enkeltsaker, og det skal i slike
                tilfeller føres dobbel protokoll. Ved lukkede dører har bare
                styrets medlemmer møterett.
              </li>
              <li>
                Styret skal:
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>iverksette årsmøtets bestemmelser</li>
                  <li>
                    oppnevne etter behov arbeidsgrupper/utvalg/personer for
                    spesielle oppgaver og utarbeide instruks for disse
                  </li>
                  <li>
                    administrere og føre nødvendig kontroll med foreningens
                    økonomi og eiendeler i henhold til de til enhver tid
                    gjeldende instrukser og bestemmelser
                  </li>
                  <li>representere foreningen utad</li>
                </ol>
              </li>
              <li>Styret har generell taushetsplikt.</li>
            </ol>
          </section>

          <section id="8" className="scroll-mt-20">
            <h2 className="text-foreground">§8 Vedtektsendringer</h2>
            <p>
              Endringer i disse vedtekter kan bare foretas på ordinært eller
              ekstraordinært årsmøte etter å ha vært på sakslisten, og det
              kreves 2/3 flertall av de avgitte stemmene.
            </p>
          </section>

          <section id="9" className="scroll-mt-20">
            <h2 className="text-foreground">§9 Oppløsning (kan ikke endres)</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                Oppløsning av foreningen kan bare behandles på ordinært årsmøte.
                Blir oppløsning vedtatt med minst 2/3 flertall, innkalles
                ekstraordinært årsmøte 3 måneder senere. For at oppløsning skal
                skje må vedtaket her gjentas med 2/3 flertall.
              </li>
              <li>
                Ingen medlemmer har krav på foreningens midler eller andel av
                disse.
              </li>
              <li>
                Foreningens formue skal etter oppløsning og gjeldsavleggelse
                tilfalle det formål foreningen arbeider for å fremme, ved at
                nettoformuen blir gitt til en eller flere ideelle organisasjoner
                som velges av årsmøtet.
              </li>
            </ol>
          </section>

          <section id="10" className="scroll-mt-20">
            <h2 className="text-foreground">§10 Signatur</h2>
            <p>
              Foreningen forpliktes av styreleder og et styremedlem i
              fellesskap.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}

export default Vedtekter
