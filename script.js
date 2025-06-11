let rows = parseInt(document.getElementById("rows").value) ;
let cols =parseInt(document.getElementById("cols").value);
let start = [0, 0];
let end = [0, 0];

function generateGrid() { 
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 40px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${r}-${c}`;
      grid.appendChild(cell);
    }
  }

  start = [0, 0]; // Top-left
  end = [rows - 1, cols - 1]; // Bottom-right

  document.getElementById(`cell-${start[0]}-${start[1]}`).classList.add("start");
  document.getElementById(`cell-${end[0]}-${end[1]}`).classList.add("end");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function highlightPath(path) {
  // Clear previous paths
  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("visited");
  });

  for (let [r, c] of path) {
    const cell = document.getElementById(`cell-${r}-${c}`);
    if (!cell.classList.contains("start") && !cell.classList.contains("end")) {
      cell.classList.add("visited");
    }
    await sleep(150);
  }
}

async function findPaths() {
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const path = [];
  const allPaths = [];

  function isValid(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols && !visited[r][c];
  }

  const directions = [
    [1, 0], // down
    [0, 1]  // right
  ];

  function dfs(r, c) {
    if (r === end[0] && c === end[1]) {
      allPaths.push([...path, [r, c]]);
      return;
    }

    visited[r][c] = true;
    path.push([r, c]);

    for (let [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;
      if (isValid(nr, nc)) dfs(nr, nc);
    }

    visited[r][c] = false;
    path.pop();
  }

  dfs(start[0], start[1]);

  if (allPaths.length === 0) {
    document.getElementById("pathCount").textContent = `Paths Found: 0`;
    alert("No paths found!");
    return;
  }

  // ✅ Increment count live as each path is shown
  let pathCounter = 0;
  document.getElementById("pathCount").textContent = `Paths Found: 0`;

  for (let p of allPaths) {
    await highlightPath(p);
    pathCounter++;
    document.getElementById("pathCount").textContent = `Paths Found: ${pathCounter}`;
    await sleep(300);
  }
}


// Initialize default grid
window.onload = generateGrid;
