import Head from 'next/head';
import Header from '@components/Header';
import HeroSection from '@components/homepage/HeroSection';
import AboutMeSection from '@components/homepage/AboutMeSection';
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
        <Header />
        <HeroSection />
        <AboutMeSection />
        <AboutMeSection />
        <AboutMeSection />
        <AboutMeSection />
        <Footer />
      </main>
    </div>
  )
}