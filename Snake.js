const area = document.querySelector(".area");
let grid = new Array(21);

createGrid();

function createGrid() {
    for (let i = 1; i < grid.length; ++i) {
        grid[i] = new Array(21);
    }

    //we create each row and cell
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

//we create the snake object
let snake = new Array(7);
for (let k = 0, j = 9; k < snake.length; ++k, --j) {
    snake[k] =  {"dir": "ArrowRight", "line": 9, "col": j};
    grid[snake[k].line][snake[k].col].classList.add("snake");
}

let turnPoints = new Array(0);

//we create the new turnpoints and set the direction for the head snake
function setDirection(e) {
    if (e.key != snake[0].dir && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") && 
        !((e.key === "ArrowUp" || e.key === "ArrowDown") && (snake[0].dir === "ArrowUp" || snake[0].dir === "ArrowDown") ||
        (e.key === "ArrowLeft" || e.key === "ArrowRight") && (snake[0].dir === "ArrowLeft" || snake[0].dir === "ArrowRight"))) {
            turnPoints.unshift({"dir": e.key, "line": snake[0].line, "col": snake[0].col});
            snake[0].dir = turnPoints[0].dir;           
    }   
}

var animate = setInterval(move, 100);

function move() {
    //We check to see if the next head cell in a specific direction will be outside the grid or in the snake body
    if ((snake[0].dir === "ArrowUp" && (snake[0].line - 1 === 0 || grid[snake[0].line - 1][snake[0].col].classList.contains("snake"))) ||
    (snake[0].dir === "ArrowDown" && (snake[0].line + 1 === 21 || grid[snake[0].line + 1][snake[0].col].classList.contains("snake"))) ||
    (snake[0].dir === "ArrowLeft" && (snake[0].col - 1 === 0 || grid[snake[0].line][snake[0].col - 1].classList.contains("snake"))) ||
    (snake[0].dir === "ArrowRight" && (snake[0].col + 1 === 21 || grid[snake[0].line][snake[0].col + 1].classList.contains("snake")))) {
        clearInterval(animate);
    } else {
        //We change the content of the cells through which the snake is moving
        for (let k = 0; k < snake.length; ++k) {
            grid[snake[k].line][snake[k].col].classList.remove("snake");
            if (snake[k].dir === "ArrowUp") {
                    --snake[k].line;
            } else if (snake[k].dir === "ArrowDown") {
                    ++snake[k].line;
            } else if (snake[k].dir === "ArrowLeft") {
                    --snake[k].col;             
            } else if (snake[k].dir === "ArrowRight") {
                    ++snake[k].col;
            }
            grid[snake[k].line][snake[k].col].classList.add("snake");  
        }
        //We give the new directions to the snake cells if they passed a turnpoint
        for (let k = 1; k < snake.length; ++k) {
            for (let l = 0, end = 0; l < turnPoints.length && !end; ++l) {
                if (snake[k].line === turnPoints[l].line && snake[k].col === turnPoints[l].col) {
                    snake[k].dir = turnPoints[l].dir;
                    end = 1;
                }          
            }
        }
        //We delete the last turnpoint if the last snake cell passed it
        if (turnPoints.length >= 1 && snake[snake.length - 1].line === turnPoints[turnPoints.length - 1].line && 
            snake[snake.length - 1].col === turnPoints[turnPoints.length - 1].col) {
                turnPoints.pop();
        }
    }
}

window.addEventListener("keydown", setDirection);
