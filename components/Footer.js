import React from 'react';
import Link from 'next/link';
import styles from '/styles/Footer.module.css';

const Footer = () => {
  return(
    <footer className={styles.footer}>
      © Dongping Wang 2024. Powered by Netlify.<br/>
      <Link href="https://github.com/dooodle74/netlify-site-dpwang/" target="_blank" rel="noopener noreferrer"><a>View Source</a></Link> | <Link href="mailto:dpwang01@gmail.com"><a>Contact</a></Link>
    </footer>
  );
}

export default Footer;
