let grid = [];
      let rows = 3,
        cols = 3;
      let delay = 250;
      let totalPaths = 0;
let blocked = new Set();
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

  
function createGrid(r, c , black_row , black_col) {
        const container = document.getElementById("gridContainer");
        container.innerHTML = "";
        container.style.gridTemplateColumns = `repeat(${c}, 40px)`;
        container.style.gridTemplateRows = `repeat(${r}, 40px)`;
            setTimeout(() => {
  alert("Click on the cell to add obstacle and toggle");
}, 0);
        grid = [];
        for (let i = 0; i < r; i++) {
          const row = [];
          for (let j = 0; j < c; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (i === start_row && j === start_col) cell.classList.add("start");
            if (i === end_row && j === end_col) cell.classList.add("end");
            // if (i === black_row && j === black_col && black_col >0 && black_row > 0) cell.classList.add("black");
               const key = `${i},${j}`;
            if (blocked.has(key)) cell.classList.add("black");
              cell.addEventListener("click", () => {
   
      if (cell.classList.contains("black")) {
        cell.classList.remove("black");
        blocked.delete(key);
      } else {
        cell.classList.add("black");
        blocked.add(key);
      }
    });
            container.appendChild(cell);
            row.push(cell);
          }
          grid.push(row);
       
        }
      }

      async function animatePaths(r, c, i , j , path = []) {
        if (i >= r || j >= c) return 0; 

        if (blocked.has(`${i},${j}`)) return 0;
        path.push([i, j]);
        grid[i][j].classList.add("path");
        await sleep(delay);

        if (i === end_row && j === end_col ) {
          totalPaths++;
          document.getElementById(
            "result"
          ).innerText = `Paths found: ${totalPaths}`;
          await sleep(1500);
        } else {
          await animatePaths(r, c, i + 1, j, path );
          await animatePaths(r, c, i, j + 1, path );
           
        }

        // Backtrack
        const [x, y] = path.pop();
       
          grid[x][y].classList.remove("path");
        
      }
         
           
      async function startAnimation() {
   
   let rows = parseInt(document.getElementById("rows").value);
            let cols = parseInt(document.getElementById("cols").value);
        // black_row = parseInt(document.getElementById("black_rows_id").value) - 1;
        // black_col = parseInt(document.getElementById("black_cols_id").value) - 1;

        start_row = parseInt(document.getElementById("start_row").value) - 1;
        start_col = parseInt(document.getElementById("start_col").value) - 1;

        end_row = parseInt(document.getElementById("end_row").value) - 1;
        end_col = parseInt(document.getElementById("end_col").value) - 1;

        totalPaths = 0;
        document.getElementById("result").innerText = "Animating...";
       // createGrid(rows, cols );
        await animatePaths(rows, cols ,start_row, start_col,[]);
        document.getElementById("result").innerText += ` — Animation complete.`;
      }


 window.addEventListener("DOMContentLoaded", () => {
  const inputs = [
    "rows",
    "cols",
    "start_row",
    "start_col",
    "end_row",
    "end_col",
  ].map((id) => document.getElementById(id));
const updateGridIfValid = () => {
  const rowVal = parseInt(document.getElementById("rows").value);
  const colVal = parseInt(document.getElementById("cols").value);
  const startRow = parseInt(document.getElementById("start_row").value) - 1;
  const startCol = parseInt(document.getElementById("start_col").value) - 1;
  const endRow = parseInt(document.getElementById("end_row").value) - 1;
  const endCol = parseInt(document.getElementById("end_col").value) - 1;

  const allValid = [rowVal, colVal, startRow, startCol, endRow, endCol].every(
    (v) => !isNaN(v) && v >= 0
  );

  if (allValid) {
    // Update global variables
    rows = rowVal;
    cols = colVal;
    start_row = startRow;
    start_col = startCol;
    end_row = endRow;
    end_col = endCol;

    blocked.clear(); // Optional: clear obstacles when re-creating
    createGrid(rows, cols);

  }
};


  for (const input of inputs) {
    input.addEventListener("input", updateGridIfValid);
  }
});