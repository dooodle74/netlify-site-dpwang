// Header.js
import React from 'react';
import styles from '/styles/Header.module.css';

const Header = () => {
  return(
    <div className = {styles.body}>
      <div className = {styles.ul}>
        <div className = {styles.li}><a href="/">Home</a></div>
        <div class={styles.dropdown}>
          <a href="javascript:void(0)" class={styles.dropbtn}>Dropdown</a>
          <div class={styles.dropdown-content}>
            <a href="/pages/projects">Projects</a>
            <a href="/pages/photography">Photography</a>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Header;