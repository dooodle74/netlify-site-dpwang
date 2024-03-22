import React from 'react';
import styles from '/styles/homepage/ResumeSection.module.css';
import Link from 'next/link';

const ResumeSection = () => {
  return (
    <section id="experience" className={styles.section}>
        <div className={styles.title}>Experience</div>
        <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>Software Engineer Intern, <Link href='https://ev.buaa.edu.cn/'><a>Beihang University</a></Link></div>
            <div className={styles.subsectionSubtitle}>June 2023 - July 2023</div>
            <div className={styles.subsectionBody}>
                Interned for a simulator team at the university. Implemented optimization solutions that determine effective loading instructions for cargo aircraft, which increased efficiency by 40% while maintaining accuracy. 
            </div>
        </div>
    </section>
  );
};

export default ResumeSection;