import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/PhotographyPage.module.css';
import Link from 'next/link';

const POLLING_INTERVAL = 600000; // Polling interval in milliseconds (e.g., 10 minutes)

export default function Photography() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const clientID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;
      const response = await fetch('https://api.imgur.com/3/album/xINOrOR/images', {
        headers: {
          Authorization: `Client-ID ${clientID}`, 
        },
      });
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      } else {
        console.error('Failed to fetch images:', data.status);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    // Fetch images initially when component mounts
    fetchImages();

    // Start polling at specified interval
    const intervalId = setInterval(fetchImages, POLLING_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className="container">
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>

      <main>
        <Header />

        <section className={styles.section}>
          <div className={styles.title}>Photography</div>
          <div className={styles.content}>
            I am an amateur photographer. My equipment includes a Canon <Link href="https://en.wikipedia.org/wiki/Canon_EOS_5D_Mark_II" target="_blank" rel="noopener noreferrer">EOS 5D Mark II</Link> camera body; Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_24-105mm_lens" target="_blank" rel="noopener noreferrer">EF 24-105mm 1:4</Link> zoom lens; Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_70-200mm_lens" target="_blank" rel="noopener noreferrer">EF 70-200mm 1:4</Link> zoom lens; Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_50mm_lens" target="_blank" rel="noopener noreferrer">EF 50mm 1:1.2</Link> prime lens. 
            <br /><br />
            Check out some of my work in the gallery below, powered by the <Link href="https://apidocs.imgur.com/" target="_blank" rel="noopener noreferrer">Imgur API</Link>.
          </div>
        </section>

        <div className={styles.gallery}>
          {images.map((image) => (
            <img key={image.id} src={image.link} alt={image.name} />
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}