import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section id="hello" className={styles.section}>
      <div>
        <p className={styles.pretitle}>HELLO, I AM</p>
        <h1 className={styles.title}>DAVID WANG</h1>
        <h2 className={styles.subtitle}>WELCOME TO MY HOMEPAGE</h2>
      </div>
    </section>
  );
};

export default HeroSection;