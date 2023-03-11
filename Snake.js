const area = document.querySelector(".area");
let grid = new Array(21);

createGrid();

function createGrid() {
    for (let i = 1; i < grid.length; ++i) {
        grid[i] = new Array(21);
    }

    for (let i = 1; i < grid.length; ++i) {
        const row = document.createElement("tr");
        for(let j = 1; j < grid.length; ++j) {
            grid[i][j] = document.createElement("td");
            row.appendChild(grid[i][j]);
            if ((i + j) % 2 != 0) {
                grid[i][j].classList.add("light");
            } else {
                grid[i][j].classList.add("dark");
            }
        }
        area.appendChild(row);
    }
}
