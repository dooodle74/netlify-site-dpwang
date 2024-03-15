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
          <div className="column"> 
            <img src="/icon_code.png" alt="Simple icon of code bracket" className="image-centered" />
            <p className="subtitle">Projects</p> 
            <p className="description">i code "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p> 
            <Link href="/photography">
              <button className="button">See Projects</button> 
            </Link>
          </div>

          {/* Second Column */}
          <div className="column"> 
            <img src="/icon_camera.png" alt="Simple icon of camera" className="image-centered" />
            <p className="subtitle">Photography</p> 
            <p className="description">i take photos "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p> 
            <Link href="/projects">
              <button className="button">See Gallery</button> 
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}