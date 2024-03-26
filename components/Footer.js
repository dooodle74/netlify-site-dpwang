import React from 'react';
import Link from 'next/link';
import styles from '/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div style={{marginRight: '2em'}}>© Dongping Wang 2024. Powered by Netlify.</div>
      <div style={{marginLeft: '2em', textAlign: 'right'}}><Link href="https://github.com/dooodle74/netlify-site-dpwang/" target="_blank" rel="noopener noreferrer">View Source</Link> &nbsp;&nbsp;<Link href="mailto:dpwang01@gmail.com">Contact</Link></div>
    </footer>
  );
}

export default Footer;
