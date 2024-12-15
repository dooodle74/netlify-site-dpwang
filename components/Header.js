import React from 'react';
import Link from 'next/link';
import styles from '/styles/Header.module.css';

const Header = () => {
  return (
    <ul className={styles.navbar}>
      <li className={styles.navItem}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/photography" className={styles.navLink}>
          Photos
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/blog" className={styles.navLink}>
          Blog
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/app" className={styles.navLink}>
          Apps
        </Link>
      </li>
      {/* <li className={`${styles.navItem} ${styles.floatRight}`}>
        <Link href="#about" className={styles.navLink}>
          About
        </Link>
      </li> */}
    </ul>
  );
}

export default Header;
