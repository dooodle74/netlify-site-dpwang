import React from 'react';
import Link from 'next/link';
import styles from '/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${styles.footer} ${styles.appColor}`}>
      <p>© Dongping Wang 2024. Powered by Netlify.</p>
      <p><Link href="/">Home</Link> &nbsp;&nbsp;<Link href="https://github.com/dooodle74/netlify-site-dpwang/" target="_blank" rel="noopener noreferrer">View Source</Link> &nbsp;&nbsp;<Link href="mailto:dpwang01@gmail.com">Contact</Link></p>
    </footer>
  );
}

export default Footer;
