const area = document.querySelector(".area");
const startButton = document.querySelector(".start");
let grid = new Array(21);
let snake = new Array(7);
let animate;

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

createSnake();

//We create the snake
function createSnake() {
    //We remove the previous snake if any
    const previousSnake = document.getElementsByClassName("snake");
    while (previousSnake.length) {
        previousSnake[0].classList.remove("snake");
    }
    //We build the new snake
    for (let k = 0, j = 9; k < snake.length; ++k, --j) {
        snake[k] =  {"line": 9, "col": j};
        grid[snake[k].line][snake[k].col].classList.add("snake");
    }
}

function startGame() {
    createSnake();
    clearInterval(animate);
    animate = setInterval(move, 200);
    let dir = ["ArrowRight"];
    function setDirection(e) {
        if (e && e.key != dir[dir.length - 1] && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") &&
        !((e.key === "ArrowUp" || e.key === "ArrowDown") && (dir[dir.length - 1] === "ArrowUp" || dir[dir.length - 1] === "ArrowDown") ||
        (e.key === "ArrowLeft" || e.key === "ArrowRight") && (dir[dir.length - 1] === "ArrowLeft" || dir[dir.length - 1] === "ArrowRight"))) {
            dir.push(e.key);
        }
    }
    function move() {
        //We check to see if the next head cell in a specific direction will be outside the grid or in the snake body
        if (dir[0] === "ArrowUp" && (snake[0].line - 1 === 0 || grid[snake[0].line - 1][snake[0].col].classList.contains("snake")) ||
        dir[0] === "ArrowDown" && (snake[0].line + 1 === 21 || grid[snake[0].line + 1][snake[0].col].classList.contains("snake")) ||
        dir[0] === "ArrowLeft" && (snake[0].col - 1 === 0 || grid[snake[0].line][snake[0].col - 1].classList.contains("snake")) ||
        dir[0] === "ArrowRight" && (snake[0].col + 1 === 21 || grid[snake[0].line][snake[0].col + 1].classList.contains("snake"))) {
            endGame();
            window.removeEventListener("keydown", setDirection);
        } else {
            // we move the snake by removing the snake tail cell and updating the snake head
            grid[snake[snake.length - 1].line][snake[snake.length - 1].col].classList.remove("snake");
            snake.pop();
            if (dir[0] === "ArrowUp") {
                snake.unshift({"line": snake[0].line - 1, "col": snake[0].col});
            } else if (dir[0] === "ArrowDown") {
                snake.unshift({"line": snake[0].line + 1, "col": snake[0].col});
            } else if (dir[0] === "ArrowLeft") {
                snake.unshift({"line": snake[0].line, "col": snake[0].col - 1});            
            } else if (dir[0] === "ArrowRight") {
                snake.unshift({"line": snake[0].line, "col": snake[0].col + 1});
            }
            grid[snake[0].line][snake[0].col].classList.add("snake");
            if (dir.length > 1) {
                dir.shift();
            }
        }
    }
    window.addEventListener("keydown", setDirection);
}

function endGame() {
    clearInterval(animate);
    startButton.innerText = "Start Again";
}

startButton.addEventListener("click", startGame);
