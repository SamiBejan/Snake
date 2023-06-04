const area = document.querySelector(".area");
const startButton = document.querySelector(".start");
let grid = new Array(21);
let snake = new Array(7);
let applesEaten = 0;
let animate;
let dir;

createGrid();

//We create the grid
function createGrid() {
    for (let i = 1; i < grid.length; ++i) {
        grid[i] = new Array(21);
    }
    //We create each row and cell
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
    snake = new Array(7);
    for (let k = 0, j = 9; k < snake.length; ++k, --j) {
        snake[k] =  {"line": 9, "col": j};
        grid[snake[k].line][snake[k].col].classList.add("snake");
    }
}

function startGame() {
    applesEaten = 0;
    document.getElementById("score").innerText = "Score " + applesEaten;
    createSnake();
    clearInterval(animate);
    animate = setInterval(move, 150);
    dir = ["ArrowRight"];
    //We add the new direction
    function setDirection(e) {
        function isArrowKey(e) {
            return (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight");
        }
        function isOppositeDirection(e) {
            return ((e.key === "ArrowUp" || e.key === "ArrowDown") && (dir[dir.length - 1] === "ArrowUp" || dir[dir.length - 1] === "ArrowDown") ||
            (e.key === "ArrowLeft" || e.key === "ArrowRight") && (dir[dir.length - 1] === "ArrowLeft" || dir[dir.length - 1] === "ArrowRight"));
        }
        if (isArrowKey(e) && !isOppositeDirection(e)) {
            dir.push(e.key);
        }
    }
    function move() {
        function hitWall() {
            return ((dir[0] === "ArrowUp" && snake[0].line - 1 === 0) || (dir[0] === "ArrowDown" && snake[0].line + 1 === 21) ||
            (dir[0] === "ArrowLeft" && snake[0].col - 1 === 0) || (dir[0] === "ArrowRight" && snake[0].col + 1 === 21));
        }
        function hitSnake() {
            return ((dir[0] === "ArrowUp" && grid[snake[0].line - 1][snake[0].col].classList.contains("snake")) ||
            (dir[0] === "ArrowDown" && grid[snake[0].line + 1][snake[0].col].classList.contains("snake")) ||
            (dir[0] === "ArrowLeft" && grid[snake[0].line][snake[0].col - 1].classList.contains("snake")) ||
            (dir[0] === "ArrowRight" && grid[snake[0].line][snake[0].col + 1].classList.contains("snake")));
        }
        //We end the game if the next head cell in a specific direction will be outside the grid or in the snake body
        if (hitWall() || hitSnake()) {
            clearInterval(animate);
            startButton.innerText = "Start Again";
            window.removeEventListener("keydown", setDirection);
        } else {
            //We move the snake by removing the snake tail cell and updating the snake head
            grid[snake[snake.length - 1].line][snake[snake.length - 1].col].classList.remove("snake");
            let prevTail = {"line": snake[snake.length - 1].line, "col": snake[snake.length - 1].col};
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
            //We increase the snake and generate a new apple
            if (grid[snake[0].line][snake[0].col].classList.contains("apple")) {
                snake.push({"line": prevTail.line, "col": prevTail.col});
                grid[snake[snake.length - 1].line][snake[snake.length - 1].col].classList.add("snake");
                ++applesEaten;
                document.getElementById("score").innerText = "Score " + applesEaten;
                generateApple();
           }
        }
    }
    window.addEventListener("keydown", setDirection);
}

generateApple();

function generateApple() {
    const apples = document.getElementsByClassName("apple");
    while (apples.length) {
        apples[0].classList.remove("apple");
    }
    let validPlace = false;
    while (!validPlace) {
        const line = Math.ceil(Math.random()* 20);
        const col = Math.ceil(Math.random()* 20);
        if (!grid[line][col].classList.contains("snake")) {
            validPlace = true;
            grid[line][col].classList.add("apple");
        }
    }
}

startButton.addEventListener("click", startGame);
