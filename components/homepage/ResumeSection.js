import React from 'react';
import styles from '/styles/homepage/ResumeSection.module.css';
import Link from 'next/link';

const ResumeSection = () => {
  return (
      <section id="resume" className={styles.section}>
          <div className={styles.title}>Education</div>

          <div className={styles.subsection}>
              <div className={styles.subsectionTitle}>Bachelor's in Computer Science and Mathematics, <Link href="https://www.virginia.edu/" target="_blank" rel="noopener noreferrer">University of Virginia </Link></div>
              <div className={styles.subsectionSubtitle}>August 2022 - Present</div>
              <div className={styles.subsectionBody}>
                  Expected graduation: <i>June 2025.</i><br />
                  3.8 GPA, Dean's List.<br />
                  Relevant Coursework: <i>Data Structures and Algorithms, Computer Systems and Organization, Software Engineering, Discrete Math, Theory of Computation, Abstract Algebra, Real Analysis, Stochastic Processes, Mathemetical Statistics.</i>
              </div>
          </div>
          
          <div className="divider" />

          <div className={styles.title}>Experience</div>

          <div className={styles.subsection}>
              <div className={styles.subsectionTitle}>Software Engineer Intern, <Link href="https://ev.buaa.edu.cn/" target="_blank" rel="noopener noreferrer">Beihang University</Link></div>
              <div className={styles.subsectionSubtitle}>June 2023 - July 2023</div>
              <div className={styles.subsectionBody}>
                  Interned for a simulator team at Beihang University in Beijing. Implemented optimization solutions that determine effective loading patterns for cargo aircraft, which increased efficiency by 40% while maintaining a high-level of space efficiency. 
              </div>
          </div>

          <div className={styles.subsection}>
              <div className={styles.subsectionTitle}>Site Administrator, <Link href="https://fandom.com/" target="_blank" rel="noopener noreferrer">Fandom</Link></div>
              <div className={styles.subsectionSubtitle}>March 2021 - August 2021</div>
              <div className={styles.subsectionBody}>
                  Administrator and lead web developer for the Real Racing 3 Fandom <Link href="https://rr3.fandom.com/wiki/Special:Contributions/DpWang74" target="_blank" rel="noopener noreferrer">Wiki</Link>. Our volunteer team worked on refining data storage on the Wikia platform to reduce redundant data, improving user and editor experience.
              </div>
          </div>
      </section>
  );
};

export default ResumeSection;