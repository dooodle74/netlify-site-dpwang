import React from 'react';
import styles from '/styles/homepage/HeroSection.module.css';

const HeroSection = () => {
  return (
    <section id="hello" className={styles.section}>
      <div>
        <h1 className={styles.title}>Hi, I'm <span className={styles.alias}>David</span></h1>
        <h2 className={styles.subtitle}>I build things with code and sometimes a camera</h2>
      </div>
    </section>
  );
};

export default HeroSection;