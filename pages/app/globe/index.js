import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

const GlobeScene = dynamic(() => import('@components/apps/GlobeScene'), { ssr: false });

export default function GlobePage() {
  return (
    <div>
      <Head>
        <title>Globe</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <section style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
          <GlobeScene />
        </section>
        <Footer />
      </main>
    </div>
  );
}
