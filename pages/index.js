import Head from 'next/head'
import HeroSection from '@components/HeroSection';
import Footer from '@components/Footer'
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
        <Footer />
      </main>
    </div>
  )
}