import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useState, useEffect } from 'react';
import { Maze } from '@utils/search/gridLogic';

export default function SearchGrid() {
  const GRID_SIZE = 16;
  const [maze, setMaze] = useState(new Maze(GRID_SIZE));
  const [grid, setGrid] = useState(maze.grid);
  const [mode, setMode] = useState("start"); // Dropdown state
  const [startPoint, setStartPoint] = useState([0, 0]); // Default start position

  useEffect(() => {
    maze.setStart(0, 0);
    maze.setEnd(GRID_SIZE - 1, GRID_SIZE - 1);
    setGrid([...maze.grid]);
  }, []);

  // Left-click: Assign start, end, or obstacle
  const handleTileClick = (x, y) => {
    const newMaze = new Maze(GRID_SIZE);
    Object.assign(newMaze, maze); // Preserve state

    if (mode === "start") {
      // Allow only one start point
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

    const newMaze = new Maze(GRID_SIZE);
    Object.assign(newMaze, maze);

    // Prevent removing the start point
    if (maze.grid[x][y] === "S") return;

    // Remove end point from the stored set
    if (maze.grid[x][y] === "E") {
      newMaze.removeEnd(x, y);
    }

    // Remove obstacles
    if (maze.grid[x][y] === 1) {
      newMaze.grid[x][y] = 0;
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
            <div className="grid">
              {grid.map((row, i) => (
                <div key={i} className="grid-row">
                  {row.map((cell, j) => (
                    <div
                      key={j}
                      className={`cell ${cell === 1 ? 'obstacle' : cell === 'S' ? 'start' : cell === 'E' ? 'end' : cell === 'V' ? 'visited' : ''}`}
                      onClick={() => handleTileClick(i, j)}
                      onContextMenu={(e) => handleRightClick(e, i, j)} // Right-click to reset
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
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-rows: repeat(${GRID_SIZE}, 20px);
          grid-gap: 2px;
          margin: 20px auto;
          width: fit-content;
        }
        .grid-row {
          display: grid;
          grid-template-columns: repeat(${GRID_SIZE}, 20px);
        }
        .cell {
          width: 20px;
          height: 20px;
          background: white;
          border: 1px solid #ccc;
        }
        .start {
          background: green;
        }
        .end {
          background: red;
        }
        .obstacle {
          background: black;
        }
        .visited {
          background: blue;
        }
      `}</style>
    </div>
  );
}