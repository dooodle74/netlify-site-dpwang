import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';

const GlobeScene = dynamic(() => import('@components/apps/GlobeScene'), { ssr: false });

const MARKERS = [
  { lat: 38.9072, lon: -77.0369, image: '/app/globe/emoji-yam.png' }, //city: washington dc
  { lat: 55.6761, lon: 12.5683, image: '/app/globe/emoji-tomato.png' }, // city: copenhagen
  // { lat: 30.5928, lon: 114.3052, image: '' },
];

export default function GlobeUsPage() {
  return (
    <div>
      <Head>
        <title>Globe</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header text="Globe" href="/app/globe" />
        <section style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
          <GlobeScene controls={true} markers={MARKERS} />
        </section>
        {/* <Footer /> */}
      </main>
    </div>
  );
}
