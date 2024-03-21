import React from 'react';
import styles from './AboutMeSection.module.css';

const AboutMeSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.title}>About Me</div>
      <div className={styles.content}>
        Welcome to my corner of the web! My name is David, and I'm currently a second-year student at the University of Virginia, pursuing a double major in Computer Science and Mathematics. I am an aspiring software developer and would like to leverage my skills and knowledge to contribute meaningfully to society. My goal is to immerse myself in diverse projects, tackle challenging problems, and continuously learn and grow as a developer. 

        In addition to my love for all things tech, I have a creative side that finds expression through photography. As an amateur photographer, I enjoy capturing the beauty of the world around me and sharing those moments with others. Feel free to check out some of my work <Link href="/photography"><a>here</a></Link>.
      </div>
    </section>
  );
};

export default AboutMeSection;