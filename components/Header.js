import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <img src="/dw_text-white.png" alt="Logo" />
          </a>
        </Link>
      </div>
      <div className={styles.navigation}>
        <Link href="#about">
          <a>About Me</a>
        </Link>
        {/* Add more links for other sections if needed */}
      </div>
    </header>
  );
};

export default Header;