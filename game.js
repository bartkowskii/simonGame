var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Function to generate the next color in the sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
}

// Event listener for button clicks
document.querySelectorAll(".btn").forEach(function (button) {
  button.addEventListener("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    // Add pressed class to the button to animate it
    function animatePress(currentColour) {
      document.getElementById(currentColour).classList.add("pressed");
      setTimeout(function () {
        document.getElementById(currentColour).classList.remove("pressed");
      }, 100);
    }
    animatePress(userChosenColour);

    // Play the sound for the clicked button
    var playSound = new Audio("sounds/" + userChosenColour + ".mp3");
    playSound.play();
  });
});
