import React from 'react';
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <div className={styles.hero-section}>
      <div className={styles.hero-content}>
        <h1>Welcome to My Website</h1>
        <p>A brief description or tagline can go here.</p>
      </div>
    </div>
  );
};

export default HeroSection;