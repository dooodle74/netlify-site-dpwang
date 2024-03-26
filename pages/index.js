import Head from 'next/head';
import Header from '@components/Header';
import HeroSection from '@components/homepage/HeroSection';
import AboutMeSection from '@components/homepage/AboutMeSection';
import ResumeSection from '@components/homepage/ResumeSection';
import ExploreSection from '@components/homepage/ExploreSection';
import Footer from '@components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>David Wang</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header text={"hello"} link={"/photography"}/>
        <HeroSection />
        <AboutMeSection />
        <ResumeSection />
        <ExploreSection />
        <Footer />
      </main>
    </div>
  )
}