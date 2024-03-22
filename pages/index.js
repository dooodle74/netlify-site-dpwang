import Head from 'next/head';
import Header from '@components/Header';
import HeroSection from '@components/HeroSection';
import AboutMeSection from '@components/AboutMeSection';
import Footer from '@components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>David Wang</title>
        <link rel="icon" href="/dw-black.png" />
      </Head>
      <main>
        <Header />
        <HeroSection />
        <body>
          <AboutMeSection />
          <AboutMeSection />
          <AboutMeSection />
          <AboutMeSection />
        </body>
        <Footer />
      </main>
    </div>
  )
}