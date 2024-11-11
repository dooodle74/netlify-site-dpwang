import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CombinatoricsIndex() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Combinatorics</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className="sectionGray">
          <div className="container">
            <h1>Test heading</h1>
            Test
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}