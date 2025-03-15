import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useState, useEffect } from 'react';
import { Maze } from '@utils/search/gridLogic';
import styles from '/styles/apps/search/searchGrid.module.css';

const NUM_ROWS = 16; // Fixed number of rows
const NUM_COLS = 16; // Fixed number of columns

export default function SearchGrid() {
  const [maze, setMaze] = useState(new Maze(NUM_ROWS, NUM_COLS));
  const [grid, setGrid] = useState(maze.grid);
  const [mode, setMode] = useState("start"); // Dropdown state
  const [startPoint, setStartPoint] = useState([0, 0]); // Default start position

  useEffect(() => {
    const newMaze = new Maze(NUM_ROWS, NUM_COLS);
    newMaze.setStart(0, 0);
    newMaze.setEnd(NUM_ROWS - 1, NUM_COLS - 1);
    setMaze(newMaze);
    setGrid([...newMaze.grid]);
  }, []); // Only runs once on mount

  // Left-click: Assign start, end, or obstacle
  const handleTileClick = (x, y) => {
    const newMaze = new Maze(NUM_ROWS, NUM_COLS);
    Object.assign(newMaze, maze); // Preserve state

    if (mode === "start") {
      if (startPoint) newMaze.grid[startPoint[0]][startPoint[1]] = 0; // Reset previous start
      newMaze.setStart(x, y);
      setStartPoint([x, y]); // Update start point
    } else if (mode === "end") {
      newMaze.setEnd(x, y); // Allow multiple end points
    } else if (mode === "obstacle") {
      newMaze.addObstacle(x, y);
    }

    setMaze(newMaze);
    setGrid([...newMaze.grid]); // Update UI
  };

  // Right-click: Deselect an obstacle or end point (start point cannot be removed)
  const handleRightClick = (e, x, y) => {
    e.preventDefault(); // Prevent browser context menu

    const newMaze = new Maze(NUM_ROWS, NUM_COLS);
    Object.assign(newMaze, maze);

    if (maze.grid[x][y] === "S") return;
    if (maze.grid[x][y] === "E") newMaze.removeEnd(x, y);
    if (maze.grid[x][y] === 1) newMaze.grid[x][y] = 0;

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
        <Header text="Search Visualizer" href="search" />
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
          <div className="container">
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
                    onContextMenu={(e) => handleRightClick(e, i, j)}
                    ></div>
                ))}
                </div>
            ))}
            </div>

            <button onClick={runBFS}>Run BFS</button>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
