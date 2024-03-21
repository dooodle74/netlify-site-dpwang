import React from 'react';
import styles from './AboutMeSection.module.css';

const AboutMeSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.title}>
        <h1>About Me</h1>
      </div>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </section>
  );
};

export default AboutMeSection;