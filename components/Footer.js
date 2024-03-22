import styles from '/styles/Footer.module.css';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <img src="/static/netlify/logo-netlify.svg" alt="Netlify Logo" className={styles.logo} />
      </footer>
    </>
  )
}
