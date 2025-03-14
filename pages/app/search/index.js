import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchIndex() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Search Algorithms</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header text="Search Visualizer" href="search" />
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