import React from 'react';
import Link from 'next/link';
import styles from '/styles/Header.module.css';

const Header = ({ text, href }) => {
  return (
    <ul className={styles.navbar}>
      <li className={styles.navItem}>
        <Link href={href} className={styles.navLink}>
            App: {text}
        </Link>
      </li>
    </ul>
  );
}

export default Header;
