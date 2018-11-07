var school = {
  name: "NOTRE DAME",
  mascot: "FIGHTIN IRISH",
  logo: "assets/images/UND-FI.jpg",
  fightSong: "x",

  playSong: function() {
    console.log("playing song");
  },
  getLogo: function() {
    return this.logo;
  },
  getSong: function() {
    return this.fightSong;
  }
};

//object.assign(a,b) - combines objects.  create obj with key:values, obj with fn and merge
//OR
//create an object and then instantiate it
//schools[i] = new School()

var schoolsList = [{}];

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
  gameStart = false,
  winner = "assets/images/winner.gif",
  loser = "assets/images/loser.jpg";
/******************************LOGIC*****************************************/

var schools = [];
schools.push(school);

$(document).ready(function() {
  $("#startBtn").on("click", function() {
    if (!gameStart) {
      newGame();
    } else {
      if (confirm("Abandon current game?")) {
        //Game Breaks here.  Need a Reset fn to empty all the stuff.
        resetGame();
        newGame();
      } else {
        return;
      }
    }
  });

  $(document).keyup(function(ev) {
    if (!gameStart) {
      return;
    }
    var tempLetter = ev.key;
    tempLetter = tempLetter.toUpperCase();

    if (ev.keyCode > 64 && ev.keyCode < 91) {
      if (school.mascot.indexOf(tempLetter) < 0) {
        buildUsedLetterList(tempLetter);
      } else {
        setLetter(tempLetter);
      }
    }

    isGameOver();
  });
});

/************************FUNCTIONS*********************************************/
function resetGame() {
  $("#schoolSpan").empty();
  $("#letterList").empty();
  $("#schoolPic").attr("src", "assets/images/Unknown.png");
  //school song

  mysteryWord = "";
  $("#winLose").addClass("hide");
  badGuess = 0;
  console.log(mysteryWord);
  console.log(badGuess);
}
function newGame() {
  //Code goes HERE TO SELECT RANDOM SCHOOL
  school = schools[Math.floor(Math.random() * schools.length)];

  //Set School Name Here
  $("#schoolSpan").html(school.name);

  //Populate Underscores
  initializeMysteryWord();
  gameStart = true;
}
function isGameOver() {
  if (badGuess > 3) {
    $("#schoolPic").attr("src", loser);
    alert("you lose");
    gameStart = false;
  }
  if (mysteryWord === school.mascot) {
    var myLogo = school.getLogo();
    $("#schoolPic").attr("src", myLogo);
    $("#winLose").removeClass("hide");
    school.playSong();
    gameStart = false;
  }
}
function buildUsedLetterList(letter) {
  var tempGuess;
  var ul2 = $("#letterList");
  if (ul2.html().indexOf(letter) >= 0) {
    return;
  }

  if (ul2.html().length === 0) {
    ul2.append(letter);
  } else {
    ul2.append(", " + letter);
  }
  badGuess++;
  tempGuess = badGuess + 1;
  tempGuess = tempGuess.toString();
  $("#downCount").html(tempGuess);
}

function setLetter(letter) {
  var tempWord = "";
  for (var i = 0; i < school.mascot.length; i++) {
    if (school.mascot.charAt(i) === letter && mysteryWord.charAt(i) === "_") {
      tempWord += letter;
    } else if (mysteryWord.charAt(i) !== "_") {
      tempWord += mysteryWord.charAt(i);
    } else {
      tempWord += "_";
    }
  }

  mysteryWord = tempWord;

  $("#guessMe").html(mysteryWord);
  //if guessMe == mascot Win, Game Over
}
function initializeMysteryWord() {
  //Sets blanks for letters for school nickname

  for (var i = 0; i < school.mascot.length; i++) {
    if (school.mascot.charAt(i) === " ") {
      mysteryWord += " ";
    } else {
      mysteryWord += "_";
    }
  }

  $("#guessMe").html(mysteryWord);
}
