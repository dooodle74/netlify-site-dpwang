import React from 'react';
import Link from 'next/link';
import styles from '/styles/Header.module.css';

const Header = ( {text, link} ) => {
  return (
    <header className={styles.header}>
      <div className={styles.sections}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/static/dw/logo-text-white.png" alt="Logo" />
          </Link>
        </div>
        {text && (
          <div className={styles.navigation}>
            <Link href={ link }>
              { text }
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;