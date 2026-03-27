import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useState, useRef, useCallback } from 'react';
import { Maze } from '@utils/search/gridLogic';
import styles from '/styles/apps/search/SearchGrid.module.css';

const ALGORITHMS = [
  { value: 'bfs',      label: 'Breadth-First Search (BFS)' },
  { value: 'dfs',      label: 'Depth-First Search (DFS)' },
  { value: 'dijkstra', label: "Dijkstra's Algorithm" },
  { value: 'astar',    label: 'A* Search' },
];

const MODES = ['start', 'end', 'obstacle', 'erase'];

const STATUS_TEXT = {
  idle:      '',
  running:   'Running...',
  found:     'Path found!',
  none:      'No path exists.',
  cancelled: 'Stopped.',
};

function cellSize(rows, cols) {
  const maxDim = Math.max(rows, cols);
  if (maxDim <= 20) return 28;
  if (maxDim <= 40) return 20;
  if (maxDim <= 60) return 14;
  return 10;
}

function StructuresPanel({ structures }) {
  if (!structures || structures.length === 0) return null;
  const MAX_SHOW = 14;
  return (
    <div className={styles.structuresPanel}>
      {structures.map(({ label, accent, items }) => {
        const shown = items.slice(0, MAX_SHOW);
        const overflow = items.length - MAX_SHOW;
        return (
          <div key={label} className={`${styles.structureCard} ${styles[`accent_${accent}`]}`}>
            <div className={styles.structureHeader}>
              <span className={styles.structureLabel}>{label}</span>
              <span className={styles.structureCount}>{items.length}</span>
            </div>
            <div className={styles.structureItems}>
              {shown.map((item, i) => (
                <div key={i} className={styles.structureItem}>{item}</div>
              ))}
              {overflow > 0 && (
                <div className={styles.structureOverflow}>+{overflow} more</div>
              )}
              {items.length === 0 && (
                <div className={styles.structureEmpty}>empty</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SearchGrid() {
  const [rowInput, setRowInput] = useState(16);
  const [colInput, setColInput] = useState(16);
  const [maze, setMaze] = useState(() => new Maze(16, 16));
  const [grid, setGrid] = useState(() => new Maze(16, 16).snapshot());
  const [mode, setMode] = useState('obstacle');
  const [algorithm, setAlgorithm] = useState('bfs');
  const [stepsPerSec, setStepsPerSec] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle');
  const [structures, setStructures] = useState(null);
  const cancelRef = useRef(false);
  const paintRef = useRef(false);

  const rows = maze.rows;
  const cols = maze.cols;
  const size = cellSize(rows, cols);

  const buildGrid = () => {
    const r = Math.max(2, Math.min(100, parseInt(rowInput) || 16));
    const c = Math.max(2, Math.min(100, parseInt(colInput) || 16));
    const m = new Maze(r, c);
    setMaze(m);
    setGrid(m.snapshot());
    setStructures(null);
    setStatus('idle');
  };

  const handleCellInteract = useCallback((r, c) => {
    if (isRunning) return;
    const cell = maze.grid[r][c];
    if ((cell === 'S' || cell === 'E') && mode !== 'erase') return;
    if (mode === 'start')    maze.setStart(r, c);
    else if (mode === 'end') maze.setEnd(r, c);
    else if (mode === 'obstacle') maze.setObstacle(r, c);
    else if (mode === 'erase')    maze.erase(r, c);
    setGrid(maze.snapshot());
  }, [maze, mode, isRunning]);

  const handleMouseDown = (r, c) => {
    if (isRunning) return;
    paintRef.current = true;
    handleCellInteract(r, c);
  };

  const handleMouseEnter = (r, c) => {
    if (!paintRef.current || isRunning) return;
    if (mode === 'obstacle' || mode === 'erase') handleCellInteract(r, c);
  };

  const handleMouseUp = () => { paintRef.current = false; };

  const runAlgorithm = async () => {
    if (!maze.start || !maze.end) { setStatus('none'); return; }
    maze.clearPath();
    setGrid(maze.snapshot());
    setStructures(null);
    cancelRef.current = false;
    setIsRunning(true);
    setStatus('running');
    const delayMs = Math.max(1, Math.round(1000 / Math.max(1, stepsPerSec)));
    const result = await maze.runAlgorithm(algorithm, setGrid, setStructures, delayMs, cancelRef);
    setIsRunning(false);
    if (result === null) setStatus('cancelled');
    else if (result)    setStatus('found');
    else                setStatus('none');
  };

  const stop = () => { cancelRef.current = true; };

  const resetPath = () => {
    if (isRunning) stop();
    maze.clearPath();
    setGrid(maze.snapshot());
    setStructures(null);
    setStatus('idle');
  };

  const clearAll = () => {
    if (isRunning) stop();
    const m = new Maze(rows, cols);
    setMaze(m);
    setGrid(m.snapshot());
    setStructures(null);
    setStatus('idle');
  };

  const getCellClass = (cell) => {
    if (cell === 'S') return styles.start;
    if (cell === 'E') return styles.end;
    if (cell === 1)   return styles.obstacle;
    if (cell === 'V') return styles.visited;
    if (cell === 'P') return styles.path;
    return styles.empty;
  };

  return (
    <div>
      <Head>
        <title>Search Visualizer</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <Header text="Search Visualizer" href="/app/search" />

        <section className="sectionGray">
          <div className="container">
            <h1>Grid Search</h1>
          </div>
        </section>

        <section className={styles.controlsSection}>
          <div className={styles.controlsContainer}>

            {/* Grid size */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Grid Size</span>
              <div className={styles.sizeInputs}>
                <input
                  type="number" min={2} max={100}
                  value={rowInput}
                  onChange={e => setRowInput(e.target.value)}
                  className={styles.sizeInput}
                  disabled={isRunning}
                />
                <span className={styles.cross}>×</span>
                <input
                  type="number" min={2} max={100}
                  value={colInput}
                  onChange={e => setColInput(e.target.value)}
                  className={styles.sizeInput}
                  disabled={isRunning}
                />
                <button className={styles.buildBtn} onClick={buildGrid} disabled={isRunning}>
                  Build
                </button>
              </div>
            </div>

            {/* Mode */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Mode</span>
              <div className={styles.modeButtons}>
                {MODES.map(m => (
                  <button
                    key={m}
                    className={`${styles.modeBtn} ${styles[`mode_${m}`]} ${mode === m ? styles.active : ''}`}
                    onClick={() => setMode(m)}
                    disabled={isRunning}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Algorithm */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Algorithm</span>
              <select
                className={styles.select}
                value={algorithm}
                onChange={e => setAlgorithm(e.target.value)}
                disabled={isRunning}
              >
                {ALGORITHMS.map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>

            {/* Steps per second */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Steps / sec</span>
              <div className={styles.stepsRow}>
                <input
                  type="number" min={1} max={200}
                  value={stepsPerSec}
                  onChange={e => setStepsPerSec(Math.max(1, parseInt(e.target.value) || 1))}
                  className={styles.stepsInput}
                  disabled={isRunning}
                />
              </div>
            </div>

          </div>

          {/* Actions + status */}
          <div className={styles.actionsRow}>
            {!isRunning ? (
              <button className={styles.runBtn} onClick={runAlgorithm}>Run</button>
            ) : (
              <button className={styles.stopBtn} onClick={stop}>Stop</button>
            )}
            <button className={styles.actionBtn} onClick={resetPath} disabled={isRunning}>Reset Path</button>
            <button className={styles.actionBtn} onClick={clearAll}  disabled={isRunning}>Clear All</button>
            {status !== 'idle' && (
              <span className={`${styles.status} ${styles[`status_${status}`]}`}>
                {STATUS_TEXT[status]}
              </span>
            )}
          </div>
        </section>

        <section className={styles.gridSection}>
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(${cols}, ${size}px)`,
              gridTemplateRows:    `repeat(${rows}, ${size}px)`,
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`${styles.cell} ${getCellClass(cell)}`}
                  style={{ width: size, height: size }}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                />
              ))
            )}
          </div>
          <p className={styles.hint}>
            {mode === 'start'    && 'Click a cell to place the start point.'}
            {mode === 'end'      && 'Click a cell to place the end point.'}
            {mode === 'obstacle' && 'Click or drag to draw obstacles.'}
            {mode === 'erase'    && 'Click or drag to erase cells.'}
          </p>

          <StructuresPanel structures={structures} />
        </section>

        <Footer />
      </main>
    </div>
  );
}
