import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/PhotographyPage.module.css';
import Link from 'next/link';

const POLLING_INTERVAL = 600000; // Polling interval in milliseconds (e.g., 10 minutes)
const IMAGES_PER_PAGE = 9; // Number of images to display per page

export default function Photography() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchImages = async (pageNumber) => {
    try {
      const clientID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;
      const response = await fetch(`https://api.imgur.com/3/album/xINOrOR/images?page=${pageNumber}&limit=${IMAGES_PER_PAGE}`, {
        headers: {
          Authorization: `Client-ID ${clientID}`, 
        },
      });
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
        // Calculate the total number of pages
        const totalCount = parseInt(response.headers.get('X-Total-Count'), 10);
        setTotalPages(Math.ceil(totalCount / IMAGES_PER_PAGE));
      } else {
        console.error('Failed to fetch images:', data.status);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    // Fetch images for the initial page when component mounts
    fetchImages(currentPage);

    // Start polling at specified interval
    const intervalId = setInterval(() => fetchImages(currentPage), POLLING_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentPage]); // Fetch images whenever currentPage changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>

      <main>
        <Header />

        <section className="sectionGray">
          <div className='container'>
            <h1>Photography</h1>
            I am an amateur photographer. My equipment includes:
            <ul>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EOS_5D_Mark_II" target="_blank" rel="noopener noreferrer">EOS 5D Mark II</Link> camera body; </li>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_24-105mm_lens" target="_blank" rel="noopener noreferrer">EF 24-105mm 1:4</Link> zoom lens; </li>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_70-200mm_lens" target="_blank" rel="noopener noreferrer">EF 70-200mm 1:4</Link> zoom lens; </li>
              <li>Canon <Link href="https://en.wikipedia.org/wiki/Canon_EF_50mm_lens" target="_blank" rel="noopener noreferrer">EF 50mm 1:1.2</Link> prime lens. </li>
            </ul>
            Check out some of my work in the gallery below, powered by the <Link href="https://apidocs.imgur.com/" target="_blank" rel="noopener noreferrer">Imgur API</Link>.
          </div>
        </section>

        <section>
          <div className={styles.gallery}>
            {images.map((image) => (
              <a key={image.id} href={image.link} target="_blank" rel="noopener noreferrer" >
                <img src={image.link} alt={image.name} />
              </a>
            ))}
          </div>
        </section>

        {totalPages > 1 && (
          <nav className={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index} 
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? styles.active : ''}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        )}

        <Footer />
      </main>
    </div>
  );
}