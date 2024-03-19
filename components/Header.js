// Header.js
import React from 'react';
import styles from '/styles/Header.module.css';

const Header = () => {
  return(
    <body>
      <ul>
        <li><a href="/">Home</a></li>
        <li class={styles.dropdown}>
          <a href="javascript:void(0)" class={styles.dropbtn}>Dropdown</a>
          <div class={styles.dropdown-content}>
            <a href="/projects">Projects</a>
            <a href="/photography">Photography</a>
          </div>
        </li>
      </ul>
      </body>
  );
}

export default Header;