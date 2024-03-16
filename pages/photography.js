import { useEffect, useState } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Photography() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const clientID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;
        const response = await fetch('https://api.imgur.com/3/album/xINOrOR/images', {
          headers: {
            Authorization: 'Client-ID ${clientID}', 
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

    fetchImages();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Photography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Header title="Welcome to Photography Page!" />
        <div className="gallery">
          {images.map((image) => (
            <img key={image.id} src={image.link} alt={image.name} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}