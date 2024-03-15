import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />

        <div className="columns"> 
          {/* First Column */}
          <Link href="/projects">
            <div className="column"> 
              <img src="/icon_code.png" alt="Simple icon of code bracket" className="image-centered" />
              <p className="subtitle">Projects</p> 
              <p className="description">i code</p> 
            </div>
          </Link>

          {/* Second Column */}
          <Link href="/photography">
            <div className="column"> 
              <img src="/icon_camera.png" alt="Simple icon of camera" className="image-centered" />
              <p className="subtitle">Photography</p> 
              <p className="description">i take photos</p> 
            </div>
          </Link>
          
        </div>
      </main>

      <Footer />
    </div>
  )
}