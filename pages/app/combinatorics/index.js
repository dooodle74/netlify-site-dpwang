import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import Link from 'next/link';
import styles from '/styles/apps/combinatorics/Combinatorics.module.css';
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
        <Header text="Combinatorics" href="combinatorics" />
        <section className={styles.sectionText}>
          <div className={styles.title}>Combinatorics</div>
          <div className={styles.content}>
            Combinatorics concepts and calculators. 
          </div>
        </section>

        <section className={styles.sectionMain}>
          <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.td}>
                <b>Permutations Calculator</b><br />Count nPr. Generate full list for smaller results.
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <Link href="combinatorics/permutation">
                  <div className={`${styles.goButton}`}>Go</div>
                </Link>
              </td>
            </tr>

            <tr>
              <td className={styles.td}>
                <b>Combinations Calculator</b><br />Count nCr. Generate full list for smaller results.
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <Link href="combinatorics/combination">
                  <div className={`${styles.goButton}`}>Go</div>
                </Link>
              </td>
            </tr>

            <tr>
              <td className={styles.td}>
                <b>Derangements Calculator</b><br />Count derangements with an option to specify number of fixed elements.
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <Link href="combinatorics/derangement">
                  <div className={`${styles.goButton}`}>Go</div>
                </Link>
              </td>
            </tr>

          </tbody>
          </table>
        </section>
        <Footer />
      </main>
    </div>
  )
}