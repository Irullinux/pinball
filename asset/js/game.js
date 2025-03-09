const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const bumpers = document.querySelectorAll(".bumper");
const obstacles = document.querySelectorAll(".obstacle");
const gameContainer = document.getElementById("game-container");

let ballX = gameContainer.clientWidth / 2;
let ballY = gameContainer.clientHeight / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;

let paddleX = gameContainer.clientWidth / 2 - paddle.clientWidth / 2;
const paddleSpeed = 20;

// Fungsi untuk memperbarui posisi bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Pantulan di dinding
    if (ballX <= 0 || ballX >= gameContainer.clientWidth - ball.clientWidth) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Pantulan di paddle
    if (
        ballY + ball.clientHeight >= gameContainer.clientHeight - paddle.clientHeight &&
        ballX + ball.clientWidth >= paddleX &&
        ballX <= paddleX + paddle.clientWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    // Pantulan di bumper
    bumpers.forEach(bumper => {
        const bumperRect = bumper.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (
            ballRect.left < bumperRect.right &&
            ballRect.right > bumperRect.left &&
            ballRect.top < bumperRect.bottom &&
            ballRect.bottom > bumperRect.top
        ) {
            ballSpeedY = -ballSpeedY;
        }
    });

    // Pantulan di obstacle
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (
            ballRect.left < obstacleRect.right &&
            ballRect.right > obstacleRect.left &&
            ballRect.top < obstacleRect.bottom &&
            ballRect.bottom > obstacleRect.top
        ) {
            ballSpeedY = -ballSpeedY;
        }
    });

    // Game over jika bola jatuh ke bawah
    if (ballY >= gameContainer.clientHeight) {
        alert("kamu terlalu jago 🗿 ! Coba lagi.");
        ballX = gameContainer.clientWidth / 2;
        ballY = gameContainer.clientHeight / 2;
        ballSpeedX = 4;
        ballSpeedY = -4;
    }

    // Update posisi bola
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

// Fungsi untuk menggerakkan paddle
function movePaddle(direction) {
    if (direction === "ArrowLeft" && paddleX > 0) {
        paddleX -= paddleSpeed;
    } else if (direction === "ArrowRight" && paddleX < gameContainer.clientWidth - paddle.clientWidth) {
        paddleX += paddleSpeed;
    }

    paddle.style.left = `${paddleX}px`;
}

// Deteksi keyboard
document.addEventListener("keydown", (event) => {
    movePaddle(event.key);
});

// Deteksi sentuhan di HP
document.addEventListener("touchstart", (event) => {
    const touchX = event.touches[0].clientX;
    if (touchX < window.innerWidth / 2) {
        movePaddle("ArrowLeft");
    } else {
        movePaddle("ArrowRight");
    }
});

// Loop game
setInterval(moveBall, 20);