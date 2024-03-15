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


        <div class="menu">
          <div class="item">Div 1</div>
          <div class="item">Div 2</div>
          <div class="item">Div 3</div>
          <div class="item">Div 4</div>
        </div>

        <div className="container">
          <div>
            <p className="description">Short description for image 1</p> 
              <Link href="/photography">
                <button className="button">Button 1</button> 
              </Link>
          </div>

          <div>
            <p className="description">Short description for image 2</p> 
              <Link href="/projects">
                <button className="button">Button 2</button> 
              </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}