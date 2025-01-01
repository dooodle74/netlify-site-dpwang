import React from 'react';
import styles from '/styles/homepage/ResumeSection.module.css';
import Link from 'next/link';

const ResumeSection = () => {
  return (
      <section id="resume" className="sectionGray">
        <div className='container'>
          {/*  container800 */}
            <div className={styles.title}>Education</div>

            <Link className={styles.aLinkNoShow} href="https://www.virginia.edu/" target="_blank" rel="noopener noreferrer" legacyBehavior>
            <a className={styles.subsection}>
                <div className={styles.subsectionTitle}>Bachelor's Degree, <Link href="https://www.virginia.edu/" target="_blank" rel="noopener noreferrer">University of Virginia </Link></div>
                <div className={styles.subsectionSubtitle}>
                    August 2022 - Present
                </div>
                <div className={styles.subsectionText}>
                    Double Major in Computer Science and Mathematics (Probability and Statistics Concentration)<br/>
                    3.8 GPA, Dean's List.<br />
                    <ul>
                        <li>Relevant Coursework: <i>Data Structures and Algorithms, Computer Systems, Software Engineering, AI, Machine Learning, Discrete Mathematics, Abstract Algebra, Real Analysis, Probability, Stochastic Processes, Statistics.</i></li>
                    </ul>
                </div>
            </a>
            </Link>
            
            <div className="divider" />

            <div className={styles.title}>Research Experience</div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Researcher, <Link href="https://engineering.virginia.edu/labs-groups/infrastructure-simulation-sensing-and-evaluation-lab" target="_blank" rel="noopener noreferrer">IS2EE Lab</Link>, University of Virginia Department of Engineering</div>
                <div className={styles.subsectionSubtitle}>May 2024 - Present</div>
                <div className={styles.subsectionText}>
                    <ul>
                        <li>Generated 25,000+ sample speckle image pairs using simulation algorithms and lab photography.</li>
                        <li>Built, trained, and tuned CNN models for displacement measurement, resulting in 0.005-pixel validation MSE.</li>
                        <li>Contributed to practical advancements in displacement prediction technology for civil engineering applications.</li>
                    </ul>
                </div>
            </div>

            <div className="divider" />

            <div className={styles.title}>Work Experience</div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Teaching Assistant, <Link href="https://engineering.virginia.edu/department/computer-science" target="_blank" rel="noopener noreferrer">Department of Computer Science</Link>, University of Virginia</div>
                <div className={styles.subsectionSubtitle}>August 2024 - May 2025</div>
                <div className={styles.subsectionSubtitle}>Courses Taught: CS 3240 "Software Engineering"</div>
                <div className={styles.subsectionText}>
                    <ul>
                        <li>Guided class project development, grading, and held office hours for a class of 300 students.</li>
                        <li>Project manager for two project groups: conducted six sprint checks in an agile development context.</li>
                        <li>Utilized Django, Google Cloud, Git, and AWS S3 for coursework and collaboration improvements.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>AI Trainer and Software Developer, <Link href="https://www.linkedin.com/company/dataannotationtech/" target="_blank" rel="noopener noreferrer">DataAnnotation</Link></div>
                <div className={styles.subsectionSubtitle}>April 2024 - Present</div>
                <div className={styles.subsectionText}>
                    <ul>
                        <li>Annotated data for 10+ AI projects, produced high-quality code responses, and led quality assurance efforts.</li>
                        <li>Developed, tested, and fine-tuned chatbot prompts across coding, advanced mathematics, and Mandarin language topics, analyzed against outgoing models (e.g. GPT-4), and ensured high-quality solutions.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.subsection}>
                <div className={styles.subsectionTitle}>Software Engineer Intern, <Link href="https://is.buaa.edu.cn/en/" target="_blank" rel="noopener noreferrer">Beihang University</Link></div>
                <div className={styles.subsectionSubtitle}>June 2023 - August 2023</div>
                <div className={styles.subsectionText}>
                    <ul>
                        <li>Implemented algorithms to solve NP-hard problems for cargo aircraft loading, utilizing dynamic programming.</li>
                        <li>Help integrate algorithms into a simulation engine in a production environment, increasing efficiency by 40%</li>
                    </ul>
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