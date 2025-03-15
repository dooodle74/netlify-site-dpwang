import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchIndex() {
  const router = useRouter();
  const [rows, setRows] = useState(16);
  const [cols, setCols] = useState(16);
  const [error, setError] = useState("");

  // Validates and navigates to the grid page
  const handleSubmit = (e) => {
    e.preventDefault();

    const rowNum = parseInt(rows);
    const colNum = parseInt(cols);

    if (
      isNaN(rowNum) || isNaN(colNum) || 
      rowNum < 2 || rowNum > 64 || rowNum % 2 !== 0 ||
      colNum < 2 || colNum > 64 || colNum % 2 !== 0
    ) {
      setError("Rows and columns must be even numbers between 2 and 64.");
      return;
    }

    setError("");
    
    // Navigate to `/grid` and pass `rows` & `cols` as state
    router.push({
      pathname: "search/grid",
      state: { rows: rowNum, cols: colNum },
    });
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
            <h1>Set Grid Size</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Rows (Even, 2-64):
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  min="2"
                  max="64"
                  step="2"
                  required
                />
              </label>
              <br />
              <label>
                Columns (Even, 2-64):
                <input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(e.target.value)}
                  min="2"
                  max="64"
                  step="2"
                  required
                />
              </label>
              <br />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Go to Grid</button>
            </form>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
