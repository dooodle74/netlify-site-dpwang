import React from 'react';
import styles from '/styles/homepage/ResumeSection.module.css';
import Link from 'next/link';

const ResumeSection = () => {
  return (
      <section id="resume" className="sectionGray">
        <div className='container container800'>
            <div className={styles.title}>Education</div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Bachelor's in Computer Science and Mathematics, <Link href="https://www.virginia.edu/" target="_blank" rel="noopener noreferrer">University of Virginia </Link></div>
                <div className={styles.subsectionSubtitle}>August 2022 - Present</div>
                <div className={styles.subsectionText}>
                    Expected graduation: <i>June 2025.</i><br />
                    3.8 GPA, Dean's List.<br />
                    Relevant Coursework: <i>Data Structures and Algorithms, Computer Systems and Organization, Software Engineering, Discrete Math, Theory of Computation, Abstract Algebra, Real Analysis, Stochastic Processes, Mathemetical Statistics.</i>
                </div>
            </div>
            
            <div className="divider" />

            <div className={styles.title}>Research Experience</div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Researcher, <Link href="https://engineering.virginia.edu/labs-groups/infrastructure-simulation-sensing-and-evaluation-lab" target="_blank" rel="noopener noreferrer">IS2EE Lab</Link>, University of Virginia Department of Engineering</div>
                <div className={styles.subsectionSubtitle}>May 2024 - Present</div>
                <div className={styles.subsectionText}>
                Implemented, developed, and tested Convolutional Neural Network (CNN) models. Contributed to a larger project aimed at developing an application for detecting structural integrity in civil engineering settings. Collaborated with a multidisciplinary team to ensure the models meet the practical needs of civil engineering applications.
                </div>
            </div>

            <div className="divider" />

            <div className={styles.title}>Work Experience</div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Teaching Assistant, <Link href="https://engineering.virginia.edu/department/computer-science" target="_blank" rel="noopener noreferrer">Department of Computer Science</Link>, University of Virginia</div>
                <div className={styles.subsectionSubtitle}>August 2024 - Present</div>
                <div className={styles.subsectionSubtitle}>Courses Taught: CS 3240 "Software Engineering"</div>
                <div className={styles.subsectionText}>
                    Supervised group project development and offered feedback on design and progress and held weekly office hours to assist students and provided grading for assignments and exams.
                </div>
            </div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>AI Model Trainer, <Link href="https://www.linkedin.com/company/dataannotationtech/" target="_blank" rel="noopener noreferrer">DataAnnotation</Link></div>
                <div className={styles.subsectionSubtitle}>April 2024 - Present</div>
                <div className={styles.subsectionText}>
                    Performed high-quality data annotation for machine learning projects, including implementing programming solutions, image labeling, object detection, and text classification. Conducted rigorous testing of current AI models and those in production to evaluate performance and identify areas for improvement.
                </div>
            </div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Software Engineer Intern, Haidian Systems Engineering and Application Technology R&D Team</div>
                <div className={styles.subsectionSubtitle}>June 2023 - August 2023</div>
                <div className={styles.subsectionText}>
                    Interned for a systems engineering and AR simulator R&D team in Beijing's university district. I contributed to the design and implementation of optimization solutions that determine effective loading patterns for cargo aircraft, which increased efficiency by 40% while maintaining a high-level of space efficiency. 
                </div>
            </div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Site Administrator, <Link href="https://fandom.com/" target="_blank" rel="noopener noreferrer">Fandom</Link></div>
                <div className={styles.subsectionSubtitle}>March 2021 - August 2021</div>
                <div className={styles.subsectionText}>
                    Administrator and developer for the Real Racing 3 Fandom <Link href="https://rr3.fandom.com/wiki/Special:Contributions/DpWang74" target="_blank" rel="noopener noreferrer">Wiki</Link>. Our volunteer team worked on refining data storage and UI design on the Wikia platform, improving the experience of 40,000+ weekly visitors and hundreds of active editors. Personally contributed more than 8,000 edits.
                </div>
            </div>
          </div>
      </section>
  );
};

export default ResumeSection;