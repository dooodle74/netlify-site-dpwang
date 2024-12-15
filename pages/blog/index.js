import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/blogs/Blog.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogsIndex() {
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
            <h1>Blogs</h1>
          </div>
        </section>
    
        <section>
          <div className="container">
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.td}>
                    <b>Rankings</b><br /> My personal ranking of different stuff. 
                  </td>
                  <td className={`${styles.td} ${styles.centered}`}>
                    <b><Link href='blog/rankings'>GOTO</Link></b><br/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}