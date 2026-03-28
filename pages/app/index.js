import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import styles from '/styles/apps/App.module.css';

const apps = [
  {
    title: 'Search Visualizer',
    description: 'Step through BFS, DFS, Dijkstra, and A* on a custom grid',
    href: '/app/search',
    placeholder: '#1e2d3d',
    image: '/static/app_icons/icon-search_visualizer.jpg',
  },
  {
    title: 'Combinatorics',
    description: 'Explore permutations, combinations, and counting',
    href: '/app/combinatorics',
    placeholder: '#1a3a4a',
    image: '/static/app_icons/icon-combinatorics.jpg',
  },
  {
    title: 'Globe',
    description: 'Interactive Earth. Texture © NASA',
    href: '/app/globe',
    placeholder: '#060d1f',
    image: '/static/app_icons/icon-globe.jpg',
  },
  {
    title: 'Coming Soon',
    description: 'Another tool in the works',
    href: '#',
    placeholder: '#2c3e50',
  },
];

export default function AppsIndex() {
  return (
    <div>
      <Head>
        <title>Apps</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <section className="sectionGray">
          <div className="container">
            <h1>Apps</h1>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {apps.map((app, i) => (
                <Link key={i} href={app.href} className={styles.card}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundColor: app.placeholder,
                      ...(app.image && { backgroundImage: `url(${app.image})` }),
                    }}
                  />
                  <div className={styles.label}>
                    <div className={styles.title}>{app.title}</div>
                    <div className={styles.description}>{app.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
