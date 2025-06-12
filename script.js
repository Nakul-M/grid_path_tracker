let grid = [];
      let rows = 3,
        cols = 3;
      let black_row = 1,
        black_col = 1;
      let delay = 1000;
      let totalPaths = 0;

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      function createGrid(r, c) {
        const container = document.getElementById("gridContainer");
        container.innerHTML = "";
        container.style.gridTemplateColumns = `repeat(${c}, 40px)`;
        container.style.gridTemplateRows = `repeat(${r}, 40px)`;

        grid = [];
        for (let i = 0; i < r; i++) {
          const row = [];
          for (let j = 0; j < c; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (i === 0 && j === 0) cell.classList.add("start");
            if (i === r - 1 && j === c - 1) cell.classList.add("end");
            if (i === black_row && j === black_col) cell.classList.add("black");
            container.appendChild(cell);
            row.push(cell);
          }
          grid.push(row);
        }
      }

      async function animatePaths(r, c, i = 0, j = 0, path = []) {
        if (i >= r || j >= c) return 0; //....
        if (i == black_row && j == black_col) return 0;
        path.push([i, j]);
        grid[i][j].classList.add("path");
        await sleep(delay);

        if (i === r - 1 && j === c - 1) {
          totalPaths++;
          document.getElementById(
            "result"
          ).innerText = `Paths found: ${totalPaths}`;
          await sleep(1000);
        } else {
          await animatePaths(r, c, i + 1, j, path);
          await animatePaths(r, c, i, j + 1, path);
        }

        // Backtrack
        const [x, y] = path.pop();
        if (!(x === 0 && y === 0) && !(x === r - 1 && y === c - 1)) {
          grid[x][y].classList.remove("path");
        }
      }

      async function startAnimation() {
        rows = parseInt(document.getElementById("rows").value);
        cols = parseInt(document.getElementById("cols").value);
        totalPaths = 0;
        document.getElementById("result").innerText = "Animating...";
        createGrid(rows, cols);
        await animatePaths(rows, cols);
        document.getElementById("result").innerText += ` — Animation complete.`;
      }

      // Initial grid
      createGrid(rows, cols);