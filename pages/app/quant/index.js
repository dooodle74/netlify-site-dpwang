import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Quant() {
  return (
    <div>
      <Head>
        <title>Quant</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className="sectionGray">
          <div className="container">
            <h1>Coming Soon</h1>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
