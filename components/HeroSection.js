import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.pretitle}>HELLO, I AM</p>
        <h1 className={styles.title}>DAVID WANG</h1>
        <h2 className={styles.subtitle}>WELCOME TO MY HOMEPAGE</h2>
        <p className={styles.subtitle}> </p>
      </div>
    </section>
  );
};

export default HeroSection;