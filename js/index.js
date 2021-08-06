//Game Constants & Variables
let board = document.getElementById('board');
let hiScorecontainer = document.getElementById('hiScoreBox');
let newScore = document.getElementById('score');
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.wav');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 3;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 3, y: 5 };
let score = 0;



// Game Functions

//Game loop
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}





function isCollide(snakeArr) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y)
            return true;
    }
    //if you collide with the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
    return false;
}


function gameEngine() {
    board.innerHTML = "";
    //updating the snake array & food

    if (isCollide(snakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        if (hiscoreval > prevHighscore) {
            alert("CONGRATS.New High Score Created.  Press any key to play again!");
        }
        else {
            alert("GAME OVER. Press any key to play again!");
        }
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        newScore.innerHTML = "Score " + score;
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // if you eaten the food ,then increment the score and regenerate the food.
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score += 1;
        speed += 0.50;
        newScore.innerHTML = "Score " + score;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScorecontainer.innerHTML = "HiScore: " + hiscoreval;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //display the snake & food

    //display the snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}












// Main Logic Starts Here

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {

    musicSound.play();
    inputDir = { x: 0, y: 1 };  //start the game.
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            //console.log(snakeArr.length);
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
// Updating the highScore in the local storage

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    var prevHighscore = hiscoreval;
    hiScorecontainer.innerHTML = "HiScore: " + hiscore;
}