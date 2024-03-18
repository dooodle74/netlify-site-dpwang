import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="container">
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Projects" />
        <p className="description">
          This is the content of the other page.
        </p>
        <Link href="/dailypi/index.html">
          <button className="button">Daily Pi</button> 
        </Link>
      </main>

      <Footer />
    </div>
  )
}