var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// START GAME
document.addEventListener("keydown", function (event) {
  if (!started && event.key === "a") {
    nextSequence();
    started = true;
  }
});

// KLIK PRZYCISKU
document.querySelectorAll(".btn").forEach(function (button) {
  button.addEventListener("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// LOSOWANIE KOLEJNEGO KOLORU
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("h1").textContent = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var button = document.getElementById(randomChosenColour);
  button.style.opacity = "0";
  setTimeout(function () {
    button.style.opacity = "1";
  }, 100);
  setTimeout(function () {
    button.style.opacity = "0";
  }, 200);
  setTimeout(function () {
    button.style.opacity = "1";
  }, 300);

  playSound(randomChosenColour);
}

// SPRAWDZANIE ODPOWIEDZI GRACZA
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.querySelector("h1").textContent = "Game Over, Press A to Restart";

    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

// DŹWIĘK
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ANIMACJA PRZYCISKU
function animatePress(currentColor) {
  var button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 100);
}

// RESET PO PORAŻCE
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
