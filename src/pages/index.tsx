import Head from "next/head"
import { About } from "@/components/About"
import { Archive } from "@/components/Archive"
import { GroupsIndex } from "@/components/GroupsIndex"
import { Hero } from "@/components/Hero"
import { PhotoStrip } from "@/components/PhotoStrip"

const Home = () => {
  return (
    <>
      <Head>
        <title>TrondheimDC</title>
        <meta
          name="description"
          content="TrondheimDC er foreningen bak TDC-konferansen, og støtter det lokale, frivillige IT-fagmiljøet i Trondheimsregionen."
        />
      </Head>
      <Hero />
      <About />
      <GroupsIndex />
      <PhotoStrip />
      <Archive />
    </>
  )
}

export default Home
