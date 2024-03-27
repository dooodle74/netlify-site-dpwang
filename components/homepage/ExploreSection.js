import React from 'react';
import Link from 'next/link';
import styles from '/styles/homepage/ExploreSection.module.css';

const Explore = () => {
  return(
    <section id="more" className={styles.section}>

        <div className={styles.container}>
            <div className={styles.tile} onClick={() => window.location.href ='/projects'}>
                <p>Projects</p>
            </div>
            <div className={styles.tile} onClick={() => window.location.href ='/photography'}>
                <p>Photography</p>
            </div>
            <div className={styles.tile} onClick={() => window.location.href ='/blog'}>
                <p>Blog</p>
            </div>
        </div>
    </section>
  );
}

export default Explore;
