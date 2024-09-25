let blockSize  = 25;
let rows = 20;
let colmn = 20;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakebody = [];

let foodX;
let foodY;

let gameOver = false;

let score = 0;
let highscore = localStorage.getItem("highscore") ? parseInt(localStorage.getItem("highscore")) : 0;
let displayscore = document.getElementById("score");
let displayhighscore = document.getElementById("highestscore");

displayhighscore.textContent = `High score: ${highscore}`;

function checkHighScore(){
    if(score > highscore){
        highscore = score;
        localStorage.setItem("highscore", highscore);
        displayhighscore.textContent =`High score: ${highscore}`;
    }
}

window.onload = function (){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = colmn * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000/10);
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX,foodY]);
        score++;
        displayscore.textContent = `Your score: ${score}`;
        placeFood();
    }


    for(let i = snakebody.length-1; i > 0; i--){
        snakebody[i] = snakebody[i-1];
    }

    if(snakebody.length){
        snakebody[0] = [snakeX,snakeY];
    }

    context.fillStyle = "lime";
    snakeX+= velocityX * blockSize;
    snakeY+= velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i = 0; i< snakebody.length; i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], blockSize,blockSize);
    }

    if(snakeX < 0 || snakeX > colmn * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver = true;
        checkHighScore();
        playAgain();
   }

    for(let i = 0; i < snakebody.length; i++){
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
            gameOver = true;
            checkHighScore();
            playAgain();
        }
    }
}

function changeDirection(e){
    if(e.code === "ArrowUp" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * colmn) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


function playAgain(){
    let playagainbtn = document.getElementById("playAgain");
    if(gameOver){
        playagainbtn.style.display = "block";
    }
    playagainbtn.addEventListener("click", () => {
        location.reload();
    })
    let lost = document.getElementById("displaylost");

    lost.textContent = "You Lost";
    lost.classList.add("lost");
}