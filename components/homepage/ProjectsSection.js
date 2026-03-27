import React from 'react';
import Link from 'next/link';
import styles from '/styles/homepage/ProjectsSection.module.css';

const projects = [
  {
    title: 'Apps',
    description: 'Interactive tools and games',
    href: '/app',
    placeholder: '#1e2d3d',
  },
  {
    title: 'Notes',
    description: 'Blogs and projects',
    href: '/blog',
    placeholder: '#1a3a4a',
  },
  {
    title: 'Photos',
    description: 'My photography work',
    href: '/photography',
    placeholder: '#2c3e50',
  },
];

const ProjectsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="https://www.linkedin.com/in/dongpingwang/" target="_blank" rel="noopener noreferrer">
            <img src="/static/icons/logo-LinkedIn-mono.png" alt="LinkedIn" width="24" />
          </a>
          <a href="https://github.com/dooodle74/" target="_blank" rel="noopener noreferrer">
            <img src="/static/icons/logo-Github.png" alt="GitHub" width="24" />
          </a>
          <a href="/static/dw/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeLink}>
            Resume
          </a>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Link key={i} href={project.href} className={styles.card}>
              <div
                className={styles.image}
                style={{ backgroundColor: project.placeholder }}
              />
              <div className={styles.label}>
                <div className={styles.title}>{project.title}</div>
                <div className={styles.description}>{project.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* <div className={styles.workingOn}>
          <div className={styles.workingOnLabel}>currently working on</div>
          <div className={styles.workingOnText}>placeholder — add what you're building</div>
        </div> */}
      </div>
    </section>
  );
};

export default ProjectsSection;
