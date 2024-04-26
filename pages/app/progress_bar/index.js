import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import styles from '/styles/apps/progress_bar/ProgressBar.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Progress Tracker</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className={styles.sectionText}>
          <div className={styles.title}>Progress Bar</div>
          <div className={styles.contentCentered}>
            Display a progress bar of the current year, some event, and more! Choose from popular ideas, or customize your own. 
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}