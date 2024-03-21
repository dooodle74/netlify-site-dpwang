import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.pretitle}>HELLO, I AM</p>
        <h1 className={styles.title}>David Wang</h1>
        <h2 className={styles.subtitle}>Welcome to my homepage.</h2>
      </div>
    </section>
  );
};

export default HeroSection;