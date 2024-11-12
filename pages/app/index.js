import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/apps/App.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CombinatoricsIndex() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Apps</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className="sectionGray">
          <div className="container">
            <h1>Stuff</h1>
          </div>
        </section>
    
        <section>
          <div className="container">
            <div className={styles.tileContainer}>
              <a href="app/search" className={styles.tile} style={{ backgroundImage: "url('/static/app_icons/search_icon_3.png')"  }}></a>
              <a href="app/combinatorics" className={styles.tile} style={{ backgroundImage: "url('/static/app_icons/combinatorics_icon.png')" }}></a>
              <a href="/" className={styles.tile} style={{ backgroundImage: "url('/path/to/image3.jpg')" }}></a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}