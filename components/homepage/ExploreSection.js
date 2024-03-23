import React from 'react';
import Link from 'next/link';
import styles from '/styles/homepage/ExploreSection.module.css';

const Explore = () => {
  return(
    <section id="more" className={styles.section}>
        <div className={styles.title}>More</div>
        <div className={styles.container}>
            <div class={styles.tile} onclick="window.location.href='/projects'">
                <h2>Projects</h2>
                <p>Description of Tile 1</p>
            </div>

            <div class={styles.tile} onclick="window.location.href='/photography'">
                <h2>Photography</h2>
                <p>Description of Tile 2</p>
            </div>
        </div>
    </section>
  );
}

export default Explore;
