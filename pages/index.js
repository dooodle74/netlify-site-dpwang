import Head from 'next/head'
import Header from '@components/Header'
import HeroSection from '@components/HeroSection';
import Footer from '@components/Footer'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>David Wang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <main>
        <HeroSection />
      </main>

      <Footer />
    </div>
  )
}