var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var level = 0;
var started = false;

$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press any key to restart.");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    makeSound("wrong");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  level++;
  $("#level-title").text("Level " + level);
  makeSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  gamePattern.push(randomChosenColor);
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
function makeSound(colorClicked) {
  var randomSound = new Audio("./sounds/" + colorClicked + ".mp3");
  randomSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
