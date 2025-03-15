import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Maze } from '@utils/search/gridLogic';
import styles from '/styles/apps/search/SearchGrid.module.css';

export default function SearchGrid() {
  const [NUM_ROWS, setNumRows] = useState(16);
  const [NUM_COLS, setNumCols] = useState(16);

  useEffect(() => {
    const storedRows = sessionStorage.getItem("gridRows");
    const storedCols = sessionStorage.getItem("gridCols");

    if (storedRows && storedCols) {
      setNumRows(parseInt(storedRows));
      setNumCols(parseInt(storedCols));
    }
  }, []);  
  
  const [maze, setMaze] = useState(new Maze(NUM_COLS, NUM_ROWS));
  const [grid, setGrid] = useState(maze.grid);
  const [mode, setMode] = useState("start"); // Dropdown state
  const [startPoint, setStartPoint] = useState([0, 0]); // Default start position
  const [endPoint, setEndPoint] = useState(null); // Single end point allowed

  useEffect(() => {
    resetToEmpty(); // Initialize the grid on mount
  }, [NUM_ROWS, NUM_COLS]);

  // Reset everything (clears all obstacles, start, end, visited, and path)
  const resetToEmpty = () => {
    const newMaze = new Maze(NUM_COLS, NUM_ROWS);
    newMaze.setStart(0, 0); // Default start position
    setMaze(newMaze);
    setGrid([...newMaze.grid]);
    setStartPoint([0, 0]);
    setEndPoint(null);
  };

  // Reset map but keep obstacles, start, and end (clears only visited and path markings)
  const resetMap = () => {
    const newMaze = new Maze(NUM_COLS, NUM_ROWS);
    Object.assign(newMaze, maze); // Copy existing maze state

    // Clear only visited and path markers
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        if (newMaze.grid[i][j] === "V" || newMaze.grid[i][j] === "P") {
          newMaze.grid[i][j] = 0;
        }
      }
    }

    setMaze(newMaze);
    setGrid([...newMaze.grid]); // Update UI
  };

  // Click: Toggle square based on mode
  const handleTileClick = (x, y) => {
    const newMaze = new Maze(NUM_COLS, NUM_ROWS);
    Object.assign(newMaze, maze); // Preserve state

    if (mode === "start") {
      if (startPoint) newMaze.grid[startPoint[0]][startPoint[1]] = 0; // Clear previous start
      newMaze.setStart(x, y);
      setStartPoint([x, y]);
    } else if (mode === "end") {
      if (endPoint) newMaze.grid[endPoint[0]][endPoint[1]] = 0; // Clear previous end
      newMaze.setEnd(x, y);
      setEndPoint([x, y]);
    } else if (mode === "obstacle") {
      newMaze.grid[x][y] = grid[x][y] === 1 ? 0 : 1; // Toggle obstacle
    }

    setMaze(newMaze);
    setGrid([...newMaze.grid]); // Update UI
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
            <h1>Grid Search</h1>
            <select onChange={(e) => setMode(e.target.value)} value={mode}>
              <option value="start">Start</option>
              <option value="end">End</option>
              <option value="obstacle">Obstacle</option>
            </select>
          </div>
        </section>
        <section className="section">
          <div className="container90">
            <div className={styles.grid}
                style={{ 
                  gridTemplateRows: `repeat(${NUM_ROWS}, 20px)`,
                  gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`
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
        <Footer />
      </main>
    </div>
  );
}
