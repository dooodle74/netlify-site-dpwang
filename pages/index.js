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

        <div className="menu">
          <p className="description">Short description for image 1</p> 
            <Link href="/photography">
              <button className="button">Button 1</button> 
            </Link>
            
            <p className="description">Short description for image 2</p> 
            <Link href="/projects">
              <button className="button">Button 2</button> 
            </Link>
        </div>

      </main>

      <Footer />
    </div>
  )
}