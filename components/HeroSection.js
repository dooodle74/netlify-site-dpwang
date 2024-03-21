import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p>Hi, I am</p>
        <h1 class="title">David Wang</h1>
        <h2 class="subtitle">Welcome to my homepage.</h2>
      </div>
    </section>
  );
};

export default HeroSection;