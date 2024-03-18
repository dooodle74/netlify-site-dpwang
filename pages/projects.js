import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="container">
      <Head>
        <title>Other Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to Other Page!" />
        <p className="description">
          This is the content of the other page.
        </p>
        <Link href="/dailypi/current.html">
          <button className="button">Daily Pi</button> 
        </Link>
      </main>

      <Footer />
    </div>
  )
}