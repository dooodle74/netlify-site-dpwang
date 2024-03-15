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
        <p className="description">
          body filler 
        </p>
        <Link href="/photography">
          <a>
            <button>Go to Other Page</button>
          </a>
        </Link>
      </main>

      <Footer />
    </div>
  )
}