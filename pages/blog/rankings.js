import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import styles from '/styles/blogs/Blog.module.css';

export default function Rankings() {
  return (
    <div>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className="sectionGray">
          <div className="container">
            <h1>Rankings</h1>
            Personal opinion. Lists and rankings.
          </div>
        </section>

        <section>
          <div className="container">

            <table className={styles.table}>
              <tbody>
                <tr>
                  <h2>Top 5 Road Cars</h2> 
                  Mass-produced road-legal vehicles.
                </tr>
                <tr>
                    <td className={styles.td}>
                        <b>1. Koenigsegg Regera (2016)</b><br />
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
                        <b>2. Lamborghini Aventador LP 750-4 SV (2015)</b><br />
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://media.drive.com.au/obj/caradvice/private/6fdf1e1b78f84602e894d56c7223442a" alt="Image 5" width="100%" />
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://assets.whichcar.com.au/image/upload/s--j4F3ivQr--/v1/archive/motor/2016/03/24/61241/Lamborghini-Avendator-SV-main.jpg" alt="Image 5" width="100%" />
                    </td>
                </tr>

                <tr>
                    <td className={styles.td}>
                        <b>3. Ferrari F40 (1987)</b><br />
                    </td>
                    <td className={styles.tdImage}>
                        <img src="https://www.thedrive.com/wp-content/uploads/images-by-url-td/content/2017/07/a-f40-1920.jpg" alt="Image 5" width="100%" />
                    </td>
                    <td className={styles.tdImage}>
                        <img src="blog/Ferrari-F40-1987.jpg" alt="Image 5" width="100%" />
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