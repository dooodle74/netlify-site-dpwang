import React from 'react';
import Link from 'next/link';
import styles from '/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© yam</p>
      <p><Link href="https://github.com/dooodle74/netlify-site-dpwang/" target="_blank" rel="noopener noreferrer">View Source</Link> </p>
      {/* &nbsp;&nbsp;<Link href="mailto:dpwang01@gmail.com">Contact</Link> */}
    </footer>
  );
}

export default Footer;
