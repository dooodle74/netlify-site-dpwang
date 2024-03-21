import React from 'react';
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <section className={styles.hero-section}>
      <div className={styles.hero-content}>
        <h1>Welcome to My Website</h1>
        <p>A brief description or tagline can go here.</p>
      </div>
    </section>
  );
};

export default HeroSection;