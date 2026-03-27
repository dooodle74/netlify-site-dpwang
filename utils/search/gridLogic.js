export class Maze {
  constructor(rows = 16, cols = 16) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    this.start = null;
    this.end = null;
  }

  setStart(row, col) {
    if (this.start) this.grid[this.start[0]][this.start[1]] = 0;
    this.start = [row, col];
    this.grid[row][col] = 'S';
  }

  setEnd(row, col) {
    if (this.end) this.grid[this.end[0]][this.end[1]] = 0;
    this.end = [row, col];
    this.grid[row][col] = 'E';
  }

  setObstacle(row, col) {
    if (this.grid[row][col] === 0) this.grid[row][col] = 1;
  }

  erase(row, col) {
    if (this.grid[row][col] !== 'S' && this.grid[row][col] !== 'E') {
      this.grid[row][col] = 0;
    }
  }

  isValid(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  clearPath() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === 'V' || this.grid[r][c] === 'P') {
          this.grid[r][c] = 0;
        }
      }
    }
  }

  snapshot() {
    return this.grid.map(row => [...row]);
  }

  async runAlgorithm(algorithm, updateGrid, updateStructures, delayMs, cancelRef, pauseRef) {
    this.clearPath();
    switch (algorithm) {
      case 'bfs':      return await this.bfs(updateGrid, updateStructures, delayMs, cancelRef, pauseRef);
      case 'dfs':      return await this.dfs(updateGrid, updateStructures, delayMs, cancelRef, pauseRef);
      case 'dijkstra': return await this.dijkstra(updateGrid, updateStructures, delayMs, cancelRef, pauseRef);
      case 'astar':    return await this.astar(updateGrid, updateStructures, delayMs, cancelRef, pauseRef);
      default:         return false;
    }
  }

  async bfs(updateGrid, updateStructures, delayMs, cancelRef, pauseRef) {
    if (!this.start || !this.end) return null;
    const [sr, sc] = this.start;
    const [er, ec] = this.end;
    const prev = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    const visited = new Set([`${sr},${sc}`]);
    const queue = [[sr, sc]];
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

    while (queue.length) {
      if (cancelRef.current) return null;
      const [r, c] = queue.shift();

      if (r === er && c === ec) {
        return this._tracePath(prev, er, ec, updateGrid, updateStructures, [
          { label: 'Queue',   accent: 'blue',   items: queue.map(([r,c]) => coord(r,c)) },
          { label: 'Visited', accent: 'purple', items: [...visited].map(setCoord) },
        ]);
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        const key = `${nr},${nc}`;
        if (this.isValid(nr, nc) && !visited.has(key) && this.grid[nr][nc] !== 1) {
          visited.add(key);
          prev[nr][nc] = [r, c];
          queue.push([nr, nc]);
          if (this.grid[nr][nc] === 0) {
            this.grid[nr][nc] = 'V';
            updateGrid(this.snapshot());
            updateStructures([
              { label: 'Queue',   accent: 'blue',   items: queue.map(([r,c]) => coord(r,c)) },
              { label: 'Visited', accent: 'purple', items: [...visited].map(setCoord) },
            ]);
            await step(delayMs, cancelRef, pauseRef);
          }
        }
      }
    }
    return false;
  }

  async dfs(updateGrid, updateStructures, delayMs, cancelRef, pauseRef) {
    if (!this.start || !this.end) return null;
    const [sr, sc] = this.start;
    const [er, ec] = this.end;
    const prev = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    const visited = new Set([`${sr},${sc}`]);
    const stack = [[sr, sc]];
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

    while (stack.length) {
      if (cancelRef.current) return null;
      const [r, c] = stack.pop();

      if (r === er && c === ec) {
        return this._tracePath(prev, er, ec, updateGrid, updateStructures, [
          { label: 'Stack',   accent: 'blue',   items: [...stack].reverse().map(([r,c]) => coord(r,c)) },
          { label: 'Visited', accent: 'purple', items: [...visited].map(setCoord) },
        ]);
      }

      if (this.grid[r][c] === 0) {
        this.grid[r][c] = 'V';
        updateGrid(this.snapshot());
        updateStructures([
          { label: 'Stack',   accent: 'blue',   items: [...stack].reverse().map(([r,c]) => coord(r,c)) },
          { label: 'Visited', accent: 'purple', items: [...visited].map(setCoord) },
        ]);
        await step(delayMs, cancelRef, pauseRef);
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        const key = `${nr},${nc}`;
        if (this.isValid(nr, nc) && !visited.has(key) && this.grid[nr][nc] !== 1) {
          visited.add(key);
          prev[nr][nc] = [r, c];
          stack.push([nr, nc]);
        }
      }
    }
    return false;
  }

  async dijkstra(updateGrid, updateStructures, delayMs, cancelRef, pauseRef) {
    if (!this.start || !this.end) return null;
    const [sr, sc] = this.start;
    const [er, ec] = this.end;
    const dist = Array.from({ length: this.rows }, () => Array(this.cols).fill(Infinity));
    const prev = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    const processed = new Set();
    dist[sr][sc] = 0;
    const pq = [[0, sr, sc]];
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

    while (pq.length) {
      if (cancelRef.current) return null;
      pq.sort((a, b) => a[0] - b[0]);
      const [d, r, c] = pq.shift();
      const key = `${r},${c}`;
      if (processed.has(key)) continue;
      processed.add(key);

      if (r === er && c === ec) {
        return this._tracePath(prev, er, ec, updateGrid, updateStructures, [
          { label: 'Priority Queue', accent: 'yellow', items: [...pq].sort((a,b)=>a[0]-b[0]).map(([d,r,c]) => `${coord(r,c)} d=${d}`) },
          { label: 'Processed',      accent: 'purple', items: [...processed].map(setCoord) },
        ]);
      }

      if (this.grid[r][c] === 0) {
        this.grid[r][c] = 'V';
        updateGrid(this.snapshot());
        updateStructures([
          { label: 'Priority Queue', accent: 'yellow', items: [...pq].sort((a,b)=>a[0]-b[0]).map(([d,r,c]) => `${coord(r,c)} d=${d}`) },
          { label: 'Processed',      accent: 'purple', items: [...processed].map(setCoord) },
        ]);
        await step(delayMs, cancelRef, pauseRef);
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (this.isValid(nr, nc) && this.grid[nr][nc] !== 1 && !processed.has(`${nr},${nc}`)) {
          const nd = d + 1;
          if (nd < dist[nr][nc]) {
            dist[nr][nc] = nd;
            prev[nr][nc] = [r, c];
            pq.push([nd, nr, nc]);
          }
        }
      }
    }
    return false;
  }

  async astar(updateGrid, updateStructures, delayMs, cancelRef, pauseRef) {
    if (!this.start || !this.end) return null;
    const [sr, sc] = this.start;
    const [er, ec] = this.end;
    const h = (r, c) => Math.abs(r - er) + Math.abs(c - ec);
    const gScore = Array.from({ length: this.rows }, () => Array(this.cols).fill(Infinity));
    const prev = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    gScore[sr][sc] = 0;
    const open = [[h(sr, sc), 0, sr, sc]];
    const closed = new Set();
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

    while (open.length) {
      if (cancelRef.current) return null;
      open.sort((a, b) => a[0] - b[0]);
      const [, g, r, c] = open.shift();
      const key = `${r},${c}`;
      if (closed.has(key)) continue;
      closed.add(key);

      if (r === er && c === ec) {
        return this._tracePath(prev, er, ec, updateGrid, updateStructures, [
          { label: 'Open Set',   accent: 'yellow', items: [...open].sort((a,b)=>a[0]-b[0]).map(([f,_,r,c]) => `${coord(r,c)} f=${f}`) },
          { label: 'Closed Set', accent: 'purple', items: [...closed].map(setCoord) },
        ]);
      }

      if (this.grid[r][c] === 0) {
        this.grid[r][c] = 'V';
        updateGrid(this.snapshot());
        updateStructures([
          { label: 'Open Set',   accent: 'yellow', items: [...open].sort((a,b)=>a[0]-b[0]).map(([f,_,r,c]) => `${coord(r,c)} f=${f}`) },
          { label: 'Closed Set', accent: 'purple', items: [...closed].map(setCoord) },
        ]);
        await step(delayMs, cancelRef, pauseRef);
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        const nkey = `${nr},${nc}`;
        if (this.isValid(nr, nc) && this.grid[nr][nc] !== 1 && !closed.has(nkey)) {
          const ng = g + 1;
          if (ng < gScore[nr][nc]) {
            gScore[nr][nc] = ng;
            prev[nr][nc] = [r, c];
            open.push([ng + h(nr, nc), ng, nr, nc]);
          }
        }
      }
    }
    return false;
  }

  _tracePath(prev, er, ec, updateGrid, updateStructures, finalStructures) {
    let curr = [er, ec];
    while (curr) {
      const [r, c] = curr;
      if (this.grid[r][c] !== 'S' && this.grid[r][c] !== 'E') {
        this.grid[r][c] = 'P';
      }
      curr = prev[r][c];
    }
    updateGrid(this.snapshot());
    updateStructures(finalStructures);
    return true;
  }
}

const coord = (r, c) => `(${r}, ${c})`;
const setCoord = (key) => {
  const [r, c] = key.split(',');
  return `(${r}, ${c})`;
};

// Encode a maze to a compact string: "ROWSxCOLS|sr,sc|er,ec|r,c;r,c;..."
// V and P cells (visited/path) are ignored — only static state is encoded.
export function encodeMaze(maze) {
  const obstacles = [];
  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      if (maze.grid[r][c] === 1) obstacles.push(`${r},${c}`);
    }
  }
  const s = maze.start ? `${maze.start[0]},${maze.start[1]}` : '-';
  const e = maze.end   ? `${maze.end[0]},${maze.end[1]}`     : '-';
  return `${maze.rows}x${maze.cols}|${s}|${e}|${obstacles.join(';')}`;
}

// Decode a string produced by encodeMaze back into a Maze instance.
// Throws a descriptive Error on invalid input.
export function decodeMaze(str) {
  const parts = str.trim().split('|');
  if (parts.length < 3) throw new Error('Invalid format');

  const dimMatch = parts[0].match(/^(\d+)x(\d+)$/);
  if (!dimMatch) throw new Error('Expected dimensions like "16x16"');
  const rows = parseInt(dimMatch[1]), cols = parseInt(dimMatch[2]);
  if (rows < 2 || rows > 100 || cols < 2 || cols > 100)
    throw new Error('Dimensions must be between 2 and 100');

  const maze = new Maze(rows, cols);

  if (parts[1] && parts[1] !== '-') {
    const [sr, sc] = parts[1].split(',').map(Number);
    if (!maze.isValid(sr, sc)) throw new Error('Start position out of bounds');
    maze.setStart(sr, sc);
  }
  if (parts[2] && parts[2] !== '-') {
    const [er, ec] = parts[2].split(',').map(Number);
    if (!maze.isValid(er, ec)) throw new Error('End position out of bounds');
    maze.setEnd(er, ec);
  }
  if (parts[3]) {
    for (const token of parts[3].split(';')) {
      if (!token) continue;
      const [r, c] = token.split(',').map(Number);
      if (maze.isValid(r, c) && maze.grid[r][c] === 0) maze.grid[r][c] = 1;
    }
  }
  return maze;
}

// Wait for the step delay, then busy-wait while paused (checking cancel every 50ms).
async function step(delayMs, cancelRef, pauseRef) {
  await new Promise(res => setTimeout(res, delayMs));
  while (pauseRef.current && !cancelRef.current) {
    await new Promise(res => setTimeout(res, 50));
  }
}
