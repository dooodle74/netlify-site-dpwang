import Head from 'next/head';
import Header from '@components/Header';
import HeroSection from '@components/homepage/HeroSection';
import ProjectsSection from '@components/homepage/ProjectsSection';
import Footer from '@components/Footer';

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
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  )
}