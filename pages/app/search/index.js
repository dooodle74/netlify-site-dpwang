import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Maze, encodeMaze, decodeMaze } from '@utils/search/gridLogic';
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
  paused:    'Paused.',
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

// Parse "(row, col)" from item strings like "(3, 4)" or "(3, 4) d=5"
function parseCoord(item) {
  const m = item.match(/^\((\d+),\s*(\d+)\)/);
  if (m) return [parseInt(m[1]), parseInt(m[2])];
  return null;
}

function StructuresPanel({ structures, highlightedCell, onItemClick, horizontal }) {
  if (!structures || structures.length === 0) return null;
  return (
    <div
      className={styles.structuresPanel}
      style={horizontal ? { flexDirection: 'row', alignItems: 'flex-start' } : undefined}
    >
      {structures.map(({ label, accent, items }) => (
        <div
          key={label}
          className={`${styles.structureCard} ${styles[`accent_${accent}`]}`}
          style={horizontal ? { flex: '1 1 0', width: 0, minWidth: 0 } : undefined}
        >
          <div className={styles.structureHeader}>
            <span className={styles.structureLabel}>{label}</span>
            <span className={styles.structureCount}>{items.length}</span>
          </div>
          <div className={styles.structureItems}>
            {items.map((item, i) => {
              const coord = parseCoord(item);
              const isActive = coord && highlightedCell &&
                coord[0] === highlightedCell[0] && coord[1] === highlightedCell[1];
              return (
                <div
                  key={i}
                  className={`${styles.structureItem} ${coord ? styles.structureItemClickable : ''} ${isActive ? styles.structureItemActive : ''}`}
                  onClick={() => coord && onItemClick(coord)}
                >
                  {item}
                </div>
              );
            })}
            {items.length === 0 && (
              <div className={styles.structureEmpty}>empty</div>
            )}
          </div>
        </div>
      ))}
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
  const [stepsPerSec, setStepsPerSec] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState('idle');
  const [structures, setStructures] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(null);
  const [liveOps, setLiveOps] = useState(null);
  const [highlightedCell, setHighlightedCell] = useState(null);
  const [pathLength, setPathLength] = useState(null);
  const startTimeRef = useRef(null);
  const recentStepsRef = useRef([]);
  const warmupRef = useRef(null);
  const [narrowLayout, setNarrowLayout] = useState(false);

  useEffect(() => {
    const check = () => setNarrowLayout(window.innerWidth <= 960);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const [codeStr, setCodeStr] = useState(() => encodeMaze(new Maze(16, 16)));
  const [codeError, setCodeError] = useState('');
  const cancelRef = useRef(false);
  const pauseRef  = useRef(false);
  const paintRef  = useRef(false);

  // Keep the code string in sync with the maze whenever it changes outside of a run
  useEffect(() => {
    if (!isRunning) setCodeStr(encodeMaze(maze));
  }, [grid, isRunning]); // grid changes are the signal that maze was mutated

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
    if (mode === 'start')         maze.setStart(r, c);
    else if (mode === 'end')      maze.setEnd(r, c);
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
    setElapsedMs(null);
    setLiveOps(null);
    setHighlightedCell(null);
    setPathLength(null);
    startTimeRef.current = Date.now();
    warmupRef.current = Date.now();
    recentStepsRef.current = [];
    cancelRef.current = false;
    pauseRef.current  = false;
    setIsRunning(true);
    setIsPaused(false);
    setLiveOps(null);
    setStatus('running');
    const delayMs = Math.max(1, Math.round(1000 / Math.max(1, stepsPerSec)));
    const tickStructures = (s) => {
      const now = Date.now();
      recentStepsRef.current.push(now);
      // sliding window: keep only timestamps within the last second
      const cutoff = now - 1000;
      recentStepsRef.current = recentStepsRef.current.filter(t => t > cutoff);
      setStructures(s);
      setElapsedMs(now - startTimeRef.current);
      setLiveOps((now - warmupRef.current) >= 1000 ? recentStepsRef.current.length : null);
    };
    const result = await maze.runAlgorithm(algorithm, setGrid, tickStructures, delayMs, cancelRef, pauseRef);
    setElapsedMs(Date.now() - startTimeRef.current);
    setIsRunning(false);
    setIsPaused(false);
    if (result === null) setStatus('cancelled');
    else if (result) {
      const len = maze.grid.flat().filter(c => c === 'P').length + 1;
      setPathLength(len);
      setStatus('found');
    }
    else setStatus('none');
  };

  const stop = () => {
    cancelRef.current = true;
    pauseRef.current  = false; // unblock the busy-wait so the algorithm can exit
  };

  const togglePause = () => {
    const next = !pauseRef.current;
    pauseRef.current = next;
    setIsPaused(next);
    setStatus(next ? 'paused' : 'running');
    if (!next) {
      // resuming — reset warmup window and blank the display
      warmupRef.current = Date.now();
      recentStepsRef.current = [];
      setLiveOps(null);
    }
  };

  const resetPath = () => {
    if (isRunning) stop();
    maze.clearPath();
    setGrid(maze.snapshot());
    setStructures(null);
    setElapsedMs(null);
    setLiveOps(null);
    setHighlightedCell(null);
    setStatus('idle');
  };

  const clearAll = () => {
    if (isRunning) stop();
    const m = new Maze(rows, cols);
    setMaze(m);
    setGrid(m.snapshot());
    setStructures(null);
    setElapsedMs(null);
    setLiveOps(null);
    setHighlightedCell(null);
    setStatus('idle');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeStr).catch(() => {});
  };

  const handleLoad = () => {
    try {
      const m = decodeMaze(codeStr);
      setMaze(m);
      setGrid(m.snapshot());
      setRowInput(m.rows);
      setColInput(m.cols);
      setStructures(null);
      setHighlightedCell(null);
      setPathLength(null);
      setStatus('idle');
      setCodeError('');
    } catch (err) {
      setCodeError(err.message);
    }
  };

  const handleStructureItemClick = ([r, c]) => {
    setHighlightedCell(prev =>
      prev && prev[0] === r && prev[1] === c ? null : [r, c]
    );
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

        {/* <section className="sectionGray">
          <div className="container">
            <h1>Grid Search</h1>
          </div>
        </section> */}

        <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
        <section className={styles.controlsSection}>
          <div className={styles.controlsContainer}>

            {/* Grid size */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Grid Size <span className={styles.groupHint}>(2 – 100)</span></span>
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
              <span className={styles.groupLabel}>Click Mode</span>
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
              <input
                type="number" min={1} max={200}
                value={stepsPerSec}
                onChange={e => setStepsPerSec(Math.max(1, parseInt(e.target.value) || 1))}
                className={styles.stepsInput}
                disabled={isRunning}
              />
            </div>

          </div>

          {/* Save / Load */}
          <div className={styles.saveLoadRow}>
            <span className={styles.groupLabel}>Save / Load</span>
            <div className={styles.saveLoadInputs}>
              <input
                type="text"
                className={styles.codeInput}
                value={codeStr}
                onChange={e => { setCodeStr(e.target.value); setCodeError(''); }}
                spellCheck={false}
                disabled={isRunning}
              />
              <button className={styles.actionBtn} onClick={handleCopy} disabled={isRunning}>Copy</button>
              <button className={styles.actionBtn} onClick={handleLoad} disabled={isRunning}>Load</button>
            </div>
            {codeError && <span className={styles.codeError}>{codeError}</span>}
          </div>

          {/* Actions + status */}
          <div className={styles.actionsRow}>
            {!isRunning ? (
              <button className={styles.runBtn} onClick={runAlgorithm}>Run</button>
            ) : (
              <>
                <button className={isPaused ? styles.runBtn : styles.pauseBtn} onClick={togglePause}>
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button className={styles.stopBtn} onClick={stop}>Stop</button>
              </>
            )}
            <button className={styles.actionBtn} onClick={resetPath} disabled={isRunning}>Clear Path</button>
            <button className={styles.actionBtn} onClick={clearAll}  disabled={isRunning}>Clear All</button>
            {status !== 'idle' && (
              <span className={`${styles.status} ${styles[`status_${status}`]}`}>
                {STATUS_TEXT[status]}
                {status === 'found' && pathLength !== null && (
                  <span className={styles.pathLength}> {pathLength} units</span>
                )}
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
              row.map((cell, c) => {
                const isHighlighted = highlightedCell &&
                  highlightedCell[0] === r && highlightedCell[1] === c;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`${styles.cell} ${getCellClass(cell)} ${isHighlighted ? styles.highlighted : ''}`}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                  />
                );
              })
            )}
          </div>
          <p className={styles.hint}>
            {mode === 'start'    && 'Click a cell to place the start point.'}
            {mode === 'end'      && 'Click a cell to place the end point.'}
            {mode === 'obstacle' && 'Click or drag to draw obstacles.'}
            {mode === 'erase'    && 'Click or drag to erase cells.'}
          </p>

        </section>
        </div>{/* leftColumn */}

        <div className={styles.rightColumn}>
          <div className={styles.rightColumnHeader}>Live Stats and Data Structures</div>
          {elapsedMs !== null && (
            <div className={styles.counters}>
              <div className={styles.counter}>
                <span className={styles.counterLabel}>Time</span>
                <span className={styles.counterValue}>{elapsedMs} ms</span>
              </div>
              <div className={styles.counter}>
                <span className={styles.counterLabel}>Live Speed</span>
                <span className={styles.counterValue}>{liveOps !== null ? `${liveOps} steps/s` : '—'}</span>
              </div>
            </div>
          )}
          {structures ? (
            <StructuresPanel
              structures={structures}
              highlightedCell={highlightedCell}
              onItemClick={handleStructureItemClick}
              horizontal={narrowLayout}
            />
          ) : (
            <p className={styles.rightColumnEmpty}>
              Run an algorithm to see live data.
            </p>
          )}
        </div>
        </div>{/* mainLayout */}

        <Footer />
      </main>
    </div>
  );
}
