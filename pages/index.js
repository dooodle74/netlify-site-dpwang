import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>David Wang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my homepage" />

        <div className="columns"> 
          {/* First Column */}
          <div className="column"> 
            <img src="/icon_code.png" alt="Simple icon of code bracket" className="image-centered" />
            <p className="subtitle">Projects</p> 
            <p className="description">Take a look at my personal projects and what I'm working on.</p> 
            <Link href="/projects">
              <button className="button">See Projects</button> 
            </Link>
          </div>

          {/* Second Column */}
          <div className="column"> 
            <img src="/icon_camera.png" alt="Simple icon of camera" className="image-centered" />
            <p className="subtitle">Photography</p> 
            <p className="description">Amature photographer. See my photos</p> 
            <Link href="/photography">
              <button className="button">See Gallery</button> 
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}