import { useState } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/PhotographyPage.module.css';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const photosDir = path.join(process.cwd(), 'public/photos');
  const files = fs.readdirSync(photosDir);
  const photos = files
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => `/photos/${f}`);
  return { props: { photos } };
}

export default function Photography({ photos = [] }) {
  const [lightbox, setLightbox] = useState(null); // index of open photo

  const handleKey = (e) => {
    if (lightbox === null) return;
    if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % photos.length);
    if (e.key === 'ArrowLeft') setLightbox((lightbox - 1 + photos.length) % photos.length);
    if (e.key === 'Escape') setLightbox(null);
  };

  return (
    <div onKeyDown={handleKey} tabIndex={-1}>
      <Head>
        <title>Photography</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>

      <main>
        <Header />

        <section className="sectionGray">
          <div className="container">
            <h1>Photography</h1>
            {/* I am an amateur photographer. My equipment includes:
            <ul>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EOS_5D_Mark_II" target="_blank" rel="noopener noreferrer">EOS 5D Mark II</Link> camera body;</li>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_24-105mm_lens" target="_blank" rel="noopener noreferrer">EF 24-105mm 1:4</Link> zoom lens;</li>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_70-200mm_lens" target="_blank" rel="noopener noreferrer">EF 70-200mm 1:4</Link> zoom lens;</li>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_50mm_lens" target="_blank" rel="noopener noreferrer">EF 50mm 1:1.2</Link> prime lens.</li>
            </ul> */}
          </div>
        </section>

        <section>
          <div className={styles.gallery}>
            {photos.map((src, i) => (
              <div key={src} className={styles.thumb} onClick={() => setLightbox(i)}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </section>

        {lightbox !== null && (
          <div className={styles.overlay} onClick={() => setLightbox(null)}>
            <button className={styles.navBtn + ' ' + styles.prev} onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}>&#8249;</button>
            <img
              src={photos[lightbox]}
              alt=""
              className={styles.lightboxImg}
              onClick={(e) => e.stopPropagation()}
            />
            <button className={styles.navBtn + ' ' + styles.next} onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}>&#8250;</button>
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}>&#10005;</button>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}
