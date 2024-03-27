import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import styles from '/styles/ProjectPage.module.css';

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className={styles.sectionText}>
          <div className={styles.title}>Projects</div>
          <div className={styles.content}>
            Check out some stuff I <a style={{ color: '#00CC66' }}>made</a> or contributed to, as well as <a style={{ color: '#FFA500' }}>work in progress</a> and <a style={{ color: '#3399FF' }}>planned</a> projects.
          </div>
        </section>

        <section className={styles.sectionMain}>
          <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.td}>
                <b>Daily Pi</b><br /> Displays the next four digits of Pi at a time, refreshing daily.
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <div className={`${styles.status} ${styles.published}`}></div>
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <b><Link href='/app/dailypi/index.html'>LIVE</Link></b><br/>
                <Link href='https://github.com/dooodle74/2024_daily_pi' target="_blank" rel="noopener noreferrer">Source</Link>
              </td>
            </tr>

            <tr>
              <td className={styles.td}>
                <b>Whistleblower</b><br /> Softare Architect for Spring 2024 CS 3240 whistleblower project. An app that allows students to report miscunduct on campus, and admins to process reports.
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <div className={`${styles.status} ${styles.progress}`}></div>
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <b><Link href='https://project-b-09-c6d97ce8733a.herokuapp.com/' target="_blank" rel="noopener noreferrer">LIVE</Link></b><br/>
                <Link href='https://github.com/uva-cs3240-s24/project-b-09' target="_blank" rel="noopener noreferrer">Source</Link>
              </td>
            </tr>

            <tr>
              <td className={styles.td}>
                <b>Edugains</b><br /> 2024 Hoohacks hackathon project. An online-classroom that allows students to earn XP based on videos watchtime and forum interaction. 
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <div className={`${styles.status} ${styles.progress}`}></div>
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <Link href='https://github.com/dooodle74/2024-edugains' target="_blank" rel="noopener noreferrer">Source</Link><br/>
              </td>
            </tr>

            <tr>
              <td className={styles.td}>
                <b>Human Timer</b><br /> Count up timer 
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
                <div className={`${styles.status} ${styles.planned}`}></div>
              </td>
              <td className={`${styles.td} ${styles.centered}`}>
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