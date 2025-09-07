let gameSeq = [];
let userSeq = [];
let highest_score = 0;
let btns = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;

let gameLevel = document.querySelector("#game-level");
let instructionsPage = document.querySelector("#instructions-page");
let gameContainer = document.querySelector("#game-container");
let gameOverScreen = document.querySelector("#game-over-screen");
let playButton = document.querySelector("#play-button");
let restartButton = document.querySelector("#restart-button");
let gameOverText = document.querySelector("#game-over-text");

// Initial check for highest score on instructions page
function updateHighestScoreDisplay() {
    instructionsPage.querySelector("h3").innerText = `How to Play | Highest Score: ${highest_score}`;
}

updateHighestScoreDisplay();

// Play button starts the game
playButton.addEventListener("click", startGame);

// Restart button starts the game after a game over
restartButton.addEventListener("click", startGame);

function startGame() {
    // Hide all other screens
    instructionsPage.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    // Show the game container
    gameContainer.classList.remove("hidden");

    if (started === false) {
        started = true;
        gameLevel.innerText = `Level ${level}`;
        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    gameLevel.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        if (level > highest_score) {
            highest_score = level;
        }

        gameOverText.innerHTML = `Game over! Your score was: ${level}. <br>Highest score: ${highest_score}.`;
        
        // Hide game container and show game over screen
        gameContainer.classList.add("hidden");
        gameOverScreen.classList.remove("hidden");
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#f0f2f5"; // Reset to body background color
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}