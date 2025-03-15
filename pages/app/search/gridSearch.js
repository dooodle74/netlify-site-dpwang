import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useState } from 'react';
import { Maze } from '@utils/search/gridLogic';
import styles from '/styles/apps/search/SearchGrid.module.css';

export default function SearchGrid() {
  const [rows, setRows] = useState(16);
  const [cols, setCols] = useState(16);
  const [gridVisible, setGridVisible] = useState(false); // Controls grid visibility
  const [error, setError] = useState("");

  const [generatedRows, setGeneratedRows] = useState(16); // Stores submitted values
  const [generatedCols, setGeneratedCols] = useState(16);
  const [maze, setMaze] = useState(new Maze(16, 16));
  const [grid, setGrid] = useState(maze.grid);
  const [mode, setMode] = useState("start");
  const [startPoint, setStartPoint] = useState([0, 0]);
  const [endPoint, setEndPoint] = useState(null);

  // Handles grid size selection
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
    setGridVisible(true); // Show grid after submission
    setGeneratedRows(rowNum);
    setGeneratedCols(colNum);

    // Create a new maze with the updated size
    const newMaze = new Maze(rowNum, colNum);
    newMaze.setStart(0, 0);
    setMaze(newMaze);
    setGrid([...newMaze.grid]);
    setStartPoint([0, 0]);
    setEndPoint(null);
  };

  // Reset everything (clears all obstacles, start, end, visited, and path)
  const resetToEmpty = () => {
    const newMaze = new Maze(generatedRows, generatedCols);
    newMaze.setStart(0, 0);
    setMaze(newMaze);
    setGrid([...newMaze.grid]);
    setStartPoint([0, 0]);
    setEndPoint(null);
  };

  // Reset map but keep obstacles, start, and end (clears only visited and path markings)
  const resetMap = () => {
    const newMaze = new Maze(generatedRows, generatedCols);
    Object.assign(newMaze, maze);

    for (let i = 0; i < generatedRows; i++) {
      for (let j = 0; j < generatedCols; j++) {
        if (newMaze.grid[i][j] === "V" || newMaze.grid[i][j] === "P") {
          newMaze.grid[i][j] = 0;
        }
      }
    }

    setMaze(newMaze);
    setGrid([...newMaze.grid]);
  };

  // Click: Toggle square based on mode
  const handleTileClick = (x, y) => {
    const newMaze = new Maze(generatedRows, generatedCols);
    Object.assign(newMaze, maze);

    if (mode === "start") {
      if (startPoint) newMaze.grid[startPoint[0]][startPoint[1]] = 0;
      newMaze.setStart(x, y);
      setStartPoint([x, y]);
    } else if (mode === "end") {
      if (endPoint) newMaze.grid[endPoint[0]][endPoint[1]] = 0;
      newMaze.setEnd(x, y);
      setEndPoint([x, y]);
    } else if (mode === "obstacle") {
      newMaze.grid[x][y] = grid[x][y] === 1 ? 0 : 1;
    }

    setMaze(newMaze);
    setGrid([...newMaze.grid]);
  };

  const runBFS = async () => {
    await maze.bfs(setGrid);
  };

  return (
    <div>
      <Head>
        <title>Search Grid</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header text="Search Visualizer" href="/app/search" />
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
              <button type="submit">Generate Grid</button>
            </form>
          </div>
        </section>

        {gridVisible && (
          <section className="section">
            <div className="container90">
              <h2>Grid Search ({generatedRows} x {generatedCols})</h2>
              <select onChange={(e) => setMode(e.target.value)} value={mode}>
                <option value="start">Start</option>
                <option value="end">End</option>
                <option value="obstacle">Obstacle</option>
              </select>
              <div className={styles.grid}
                    style={{ 
                        display: "grid",
                        gridTemplateRows: `repeat(${generatedRows}, 20px)`,  
                        gridTemplateColumns: `repeat(${generatedCols}, 20px)`,  
                        gap: "1px",  // Ensure proper spacing
                        width: `${generatedCols * 21}px`, // Ensures full width
                        height: `${generatedRows * 21}px`, // Ensures full height
                    }}>
              {grid.map((row, i) => (
                  <div key={i} className={styles.gridRow}>
                  {row.map((cell, j) => (
                      <div
                      key={j}
                      className={`${styles.cell} 
                                  ${cell === 1 ? styles.obstacle : 
                                  cell === 'S' ? styles.start : 
                                  cell === 'E' ? styles.end : 
                                  cell === 'V' ? styles.visited : 
                                  cell === 'P' ? styles.path : ''}`} 
                      onClick={() => handleTileClick(i, j)}
                      ></div>
                  ))}
                  </div>
              ))}
              </div>

              <button onClick={runBFS}>Run BFS</button>
              <button onClick={resetToEmpty} style={{ marginLeft: "10px" }}>Reset to Empty</button>
              <button onClick={resetMap} style={{ marginLeft: "10px" }}>Reset Map</button>
            </div>
          </section>
        )}
        <Footer />
      </main>
    </div>
  );
}
