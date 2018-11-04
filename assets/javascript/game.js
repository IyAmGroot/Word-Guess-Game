var school = {
  name: "Notre Dame",
  mascot: "Fightin Irish",
  logo: "x",
  "fight-song": "x",

  playSong: function() {
    console.log("playing song");
  },
  getLogo: function() {
    return this.logo;
  }
};

//Press space bar to begin/reset

//Load school object
//Show School, Populate underscores for the mascot letters

//KeyUp Event
//Correct Letter:  replace underscore with letter First down, whistle.
//Incorrect Letter:  second down, third down, fourth down, LOSER.

//Win when indexOf("_") returns -1.

//Win: play fight song, show logo.
//Lose:  play PIR Loser.

/************************Variables*******************************************/
var mysteryWord = "",
  badGuess = 0,
  usedLetters = "",
  gameStart = false,
  displayText = "",
  tempMascot = "DUKES",
  tempSchool = "James Madison University";

/******************************LOGIC*****************************************/
displayText = document.getElementById("guessMe");
usedLetters = document.getElementById("letterList");
displaySchool = document.getElementById("schoolSpan");
currentDown = document.getElementById("downCount");

document.onkeyup = function() {
  var tempLetter = "";
  if (event.code === "Space") {
    if (!gameStart) {
      newGame();

      return;
    }
  }
  if (!gameStart) {
    return;
  }

  tempLetter = event.key;
  tempLetter = tempLetter.toUpperCase();

  if (event.keyCode > 64 && event.keyCode < 91) {
    if (tempMascot.indexOf(tempLetter) < 0) {
      buildUsedLetterList(tempLetter);
    } else {
      setLetter(tempLetter);
    }
  }

  isGameOver();
};

/************************FUNCTIONS*********************************************/
function newGame() {
  displaySchool.innerHTML = tempSchool;
  initializeMysteryWord();
  gameStart = true;
}
function isGameOver() {
  if (badGuess > 3) {
    alert("you lose");
  }
  if (mysteryWord === tempMascot) {
    school.playSong();
  }
}
function buildUsedLetterList(letter) {
  var tempGuess;
  if (usedLetters.innerHTML.indexOf(letter) >= 0) {
    return;
  }
  if (usedLetters.innerHTML.length === 0) {
    usedLetters.innerHTML += letter;
  } else {
    usedLetters.innerHTML += ", " + letter;
  }
  badGuess++;
  tempGuess = badGuess + 1;
  tempGuess = tempGuess.toString();
  currentDown.innerHTML = tempGuess;
}

function setLetter(letter) {
  var tempWord = "";
  for (var i = 0; i < tempMascot.length; i++) {
    if (tempMascot.charAt(i) === letter && mysteryWord.charAt(i) === "_") {
      tempWord += letter;
    } else if (mysteryWord.charAt(i) !== "_") {
      tempWord += mysteryWord.charAt(i);
    } else {
      tempWord += "_";
    }
  }

  mysteryWord = tempWord;
  displayText.innerHTML = mysteryWord;
  //if displayText == mascot Win, Game Over
}
function initializeMysteryWord() {
  for (var i = 0; i < tempMascot.length; i++) {
    mysteryWord = mysteryWord + "_";

    displayText.innerHTML = mysteryWord;
  }
}
