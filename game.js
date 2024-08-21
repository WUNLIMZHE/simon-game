var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var currentUserButton = 0;
var level = 1;
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$("body").on("keydown", function(){
  if (!started){
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence(level);
    console.log(level);
    started = true;
  }
});

function nextSequence(i){
  if (i == 0){
    console.log("\nnew pattern\n" + gamePattern);
    console.log(userClickedPattern);
    return;
  }
  setTimeout(function() {
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    nextSequence(i - 1);
  }, 1000);
}

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(currentUserButton++, userChosenColour);
});

function checkAnswer(currentLevel, userChosenColour){
  if(!(gamePattern[currentLevel] === userChosenColour)){ //if user answer wrong
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    startOver();
  } 

  if (currentLevel === gamePattern.length - 1){
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    currentUserButton = 0;
    level++;
    console.log("\nLevel completed!");
    console.log("\ncleared pattern\n" + gamePattern);
    console.log(userClickedPattern);
    nextSequence(level);
  }
}

function startOver(){
  level = 1;
  currentUserButton = 0;
  console.log(level);
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  $("#level-title").text("Game over, Press Any Key to Start");
  started = false;
}

function playSound(name){
  var name = new Audio("./sounds/" + name + ".mp3");
  name.play();
}

function animatePress(currentColour){
  console.log(currentColour);
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function getYear(){
  let date = new Date();
  year = date.getFullYear()
  return year;
}

document.getElementById("currentYear").textContent = getYear();