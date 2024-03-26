import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/PhotographyPage.module.css';

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
        <title>Photography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
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