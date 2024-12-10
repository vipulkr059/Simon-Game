const buttonColors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let currentLevel = 0;
let started = false;

document.addEventListener("keydown", () => {
  if (!started) {
    startGame();
  }
});

document.getElementById("start-btn").addEventListener("click", () => {
  if (!started) {
    startGame();
  }
});

function startGame() {
  document.getElementById("start-message").classList.add("invisible");
  level = 0;
  gameSequence = [];
  started = true;
  generateSequence();
}

document.querySelectorAll(".simon-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (started) {
      const userChosenColor = event.target.id;
      playerSequence.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(playerSequence.length - 1);
    }
  });
});

function generateSequence() {
  level++;
  playerSequence = [];
  document.getElementById("level-title").textContent = `Level: ${level}`;

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      playSound(color);
      animatePress(color);
    }, index * 600);
  });
}

function checkAnswer(currentIndex) {
  if (playerSequence[currentIndex] === gameSequence[currentIndex]) {
    if (playerSequence.length === gameSequence.length) {
      setTimeout(() => generateSequence(), 1000);
    }
  } else {
    gameOver();
  }
}

function playSound(color) {
  const audio = new Audio(
    `https://s3.amazonaws.com/freecodecamp/simonSound${
      buttonColors.indexOf(color) + 1
    }.mp3`
  );
  audio.play();
}

function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 200);
}

function gameOver() {
  playSound("wrong");
  document.body.classList.add("game-over");
  setTimeout(() => document.body.classList.remove("game-over"), 200);
  document.getElementById("level-title").textContent =
    "Game Over, Press Start to Restart";
  started = false;
}
