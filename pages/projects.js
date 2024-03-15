import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

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
      </main>

      <Footer />
    </div>
  )
}