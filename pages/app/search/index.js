import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchIndex() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'import'

  const mazeSizes = [12, 24, 48, 96];

  const handleMazeClick = (size) => {
    router.push(`/search/new?size=${size}`);
  };

  return (
    <div>
      <Head>
        <title>Search Algorithms</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header text="Search Visualizer" href="" />
        <section className="sectionGray">
          <div className="container">
            <h1>Initialize Grid</h1>
          </div>
        </section>
          
        <section className="section">
          <div className="container">
            {/* Toggle Panel */}
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <button
                onClick={() => setActiveTab('new')}
                style={{
                  marginRight: '1rem',
                  background: activeTab === 'new' ? '#333' : '#ccc',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                }}
              >
                New Maze
              </button>
              <button
                onClick={() => setActiveTab('import')}
                style={{
                  background: activeTab === 'import' ? '#333' : '#ccc',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                }}
              >
                Import Existing
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'new' && (
              <div>
                <h2>Select Maze Size</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {mazeSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleMazeClick(size)}
                      style={{
                        padding: '1rem 2rem',
                        background: '#555',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                      }}
                    >
                      {size} x {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'import' && (
              <div>
                <h2>Import Existing Maze</h2>
                <p>[Coming soon]</p>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}