import Head from 'next/head';
import HeroSection from '@components/HeroSection';
import AboutMeSection from '@components/AboutMeSection';
import Footer from '@components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>David Wang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        <HeroSection />
        <AboutMeSection />
        <Footer />
      </main>
    </div>
  )
}