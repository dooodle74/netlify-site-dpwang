import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link';
import styles from './Home.module.css'; // Import the CSS module

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <Link href="/photography">
          <div className={styles.bigBox}> {/* Use the CSS class from the module */}
            <p className={styles.bigBoxText}>Click Me!</p>
          </div>
        </Link>
      </main>

      <Footer />
    </div>
  )
}