export class Maze {
  constructor(size = 16) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(0));
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
    this.grid[x][y] = 0; // Reset tile
  }

  addObstacle(x, y) {
    if (this.isValid(x, y)) this.grid[x][y] = 1;
  }

  removeObstacle(x, y) {
    if (this.grid[x][y] === 1) {
      this.grid[x][y] = 0;
    }
  }

  isValid(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
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

      if (this.endPoints.has(`${x},${y}`)) {
        updateGrid(this.grid);
        return path;
      }

      for (let [dx, dy] of directions) {
        let nx = x + dx, ny = y + dy;
        if (this.isValid(nx, ny) && this.grid[nx][ny] !== 1 && !visited.has(`${nx},${ny}`)) {
          queue.push([nx, ny, path]);
          visited.add(`${nx},${ny}`);
          this.grid[nx][ny] = "V"; // Mark as visited
          updateGrid([...this.grid]); // Update UI
          await new Promise((resolve) => setTimeout(resolve, 50)); // Delay for visualization
        }
      }
    }
    return null;
  }
}