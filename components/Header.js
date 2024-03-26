import React from 'react';
import Link from 'next/link';
import styles from '/styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">

          <img src="/static/dw/logo-text-white.png" alt="Logo" />

        </Link>
      </div>
      <div className={styles.navigation}>
        <Link href="#about">
          About Me
        </Link>
        {/* Add more links for other sections if needed */}
      </div>
    </header>
  );
};

export default Header;