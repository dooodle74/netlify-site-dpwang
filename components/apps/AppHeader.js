import React from 'react';
import Link from 'next/link';
import styles from '/styles/Header.module.css';

const Header = ({ text, href }) => {
  return (
    <ul className={`${styles.navbar} ${styles.appColor}`}>
      <li className={styles.navItem}>
        <Link href="/app" className={styles.navLink}>
          Apps
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link href="/app" className={styles.navPipe}>
          |
        </Link>
      </li>
      
      <li className={styles.navItem}>
        <Link href={href} className={styles.navLink}>
            {text}
        </Link>
      </li>
    </ul>
  );
}

export default Header;
