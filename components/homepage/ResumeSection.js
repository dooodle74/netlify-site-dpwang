import React from 'react';
import styles from '/styles/homepage/ResumeSection.module.css';
import Link from 'next/link';

const ResumeSection = () => {
  return (
    <section id="experience" className={styles.section}>
        <div className={styles.title}>Experience</div>

        <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>Software Engineer Intern, <Link href="https://ev.buaa.edu.cn/" target="_blank" rel="noopener noreferrer"><a class="customlink">Beihang University</a></Link></div>
            <div className={styles.subsectionSubtitle}>June 2023 - July 2023</div>
            <div className={styles.subsectionBody}>
                Interned for a simulator team at the university. Implemented optimization solutions that determine effective loading instructions for cargo aircraft, which increased efficiency by 40% while maintaining accuracy. 
            </div>
        </div>

        <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>Administrator and Development Lead, <Link href="https://fandom.com/" target="_blank" rel="noopener noreferrer"><a class="customlink">Fandom</a></Link></div>
            <div className={styles.subsectionSubtitle}>March 2021 - August 2021</div>
            <div className={styles.subsectionBody}>
                Administrator and lead software developer for the RR3 Fandom Wiki. Our volunteer team worked on refining data input, storage, management, user interface, and automation in a Fandom environment, improving user and editor experience on the platform.
            </div>
        </div>
    </section>
  );
};

export default ResumeSection;