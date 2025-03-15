export class Maze {
  constructor(rows = 16, cols = 16) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    this.start = null;
    this.endPoints = new Set();
  }

  setStart(x, y) {
    this.start = [x, y];
    this.grid[x][y] = "S";
  }

  setEnd(x, y) {
    this.endPoints.add(`${x},${y}`);
    this.grid[x][y] = "E";
  }

  removeEnd(x, y) {
    this.endPoints.delete(`${x},${y}`);
    this.grid[x][y] = 0;
  }

  addObstacle(x, y) {
    if (this.isValid(x, y)) this.grid[x][y] = 1;
  }

  isValid(x, y) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
  }

  async bfs(updateGrid) {
    if (!this.start || this.endPoints.size === 0) return null;

    let queue = [[...this.start, []]];
    let visited = new Set();
    visited.add(this.start.toString());

    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0] // Right, Down, Left, Up
    ];

    while (queue.length) {
      let [x, y, path] = queue.shift();
      path = [...path, [x, y]];

      // If we reach an endpoint, highlight the shortest path
      if (this.endPoints.has(`${x},${y}`)) {
        for (const [px, py] of path) {
          if (this.grid[px][py] !== "S" && this.grid[px][py] !== "E") {
            this.grid[px][py] = "P"; // Mark path as yellow
          }
        }
        updateGrid([...this.grid]);
        return path;
      }

      for (let [dx, dy] of directions) {
        let nx = x + dx, ny = y + dy;
        if (this.isValid(nx, ny) && this.grid[nx][ny] !== 1 && !visited.has(`${nx},${ny}`)) {
          queue.push([nx, ny, path]);
          visited.add(`${nx},${ny}`);
          this.grid[nx][ny] = "V"; // Mark as visited
          updateGrid([...this.grid]); // Update UI
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    }
    return null;
  }
}
