import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import styles from '/styles/blogs/Blogs.module.css';

export default function Rankings() {
  return (
    <div>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className={styles.sectionText}>
          <div className={styles.title}>Rankings</div>
          <div className={styles.content}>
            Personal opinion. Lists and rankings.
          </div>
        </section>

        <section className={styles.sectionMain}>
            <section className={styles.subsection}>

            <div className={styles.subsectionTitle}>
                Top 5 Road Cars
            </div>

            <div className={styles.subsectionSubtitle}>
                Mass-produced road-legal vehicles.
            </div>

            <table className={styles.table}>
            <tbody>

                <tr>
                    <td className={styles.td}>
                        <b>1. Koenigsegg Regera</b><br />
                        <div class="indent20">
                            Horizon Blue + Black Aircore wheels + Creme interior.<br/>
                            + Design<br/>
                            + Direct Drive System
                        </div>
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://www.digitaltrends.com/wp-content/uploads/2015/11/rsz_regera_airstrip1.jpg" alt="Image 5" width="100%" />
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://static1.topspeedimages.com/wordpress/wp-content/uploads/2023/02/2015-koenigsegg-regera5.jpg" alt="Image 5" width="100%" />
                    </td>
                </tr>

                <tr>
                    <td className={styles.td}>
                        <b>2. Lamborghini Aventador LP 750-4 SV</b><br />
                        <div class="indent20">
                            Giallo Orion or Rosso Bia
                        </div>
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://media.drive.com.au/obj/caradvice/private/6fdf1e1b78f84602e894d56c7223442a" alt="Image 5" width="100%" />
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://assets.whichcar.com.au/image/upload/s--j4F3ivQr--/v1/archive/motor/2016/03/24/61241/Lamborghini-Avendator-SV-main.jpg" alt="Image 5" width="100%" />
                    </td>
                </tr>

            </tbody>
            </table>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  )
}