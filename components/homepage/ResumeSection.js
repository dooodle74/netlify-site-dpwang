import React from 'react';
import styles from '/styles/homepage/ResumeSection.module.css';
import Link from 'next/link';

const ResumeSection = () => {
  return (
    <section id="experience" className={styles.section}>
        <h1 className={styles.title}>Experience</h1>
        <div className={styles.subsection}>
            <h2 className={styles.subsection-title}>Software Engineer Intern, <Link href='https://ev.buaa.edu.cn/'><a>Beihang University</a></Link></h2>
            <h3 className={styles.subsection-subtitle}>June 2023 - July 2023</h3>
            <div className={styles.subsection-body}>
                Interned for a simulator team at the university. Implemented optimization solutions that determine effective loading instructions for cargo aircraft, which increased efficiency by 40% while maintaining accuracy. 
            </div>
        </div>
    </section>
  );
};

export default ResumeSection;