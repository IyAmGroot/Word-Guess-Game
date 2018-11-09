var schoolNames = [
  "Alabama",
  "James Madison University",
  "Louisiana State University",
  "Michigan",
  "Texas",
  "Ohio State",
  "UCLA",
  "Notre Dame",
  "University of Virginia",
  "Virginia Tech"
];
var schoolMascots = [
  "CRIMSON TIDE",
  "DUKES",
  "TIGERS",
  "WOLVERINES",
  "LONGHORNS",
  "BUCKEYES",
  "BRUINS",
  "FIGHTIN IRISH",
  "CAVALIERS",
  "HOKIES"
];
var schoolLogos = [
  "Alabama.jpg",
  "jmu.jpg",
  "lsu.png",
  "michigan.jpg",
  "texasfight.jpg",
  "theOSU.jpg",
  "UCLA.png",
  "UND-FI.jpg",
  "uva.jpeg",
  "virginiatech.png"
];
// var schoolSongs = [
//   "https://www.youtube.com/embed/1gu17MFr5-M?controls=0",
//   "https://www.youtube.com/embed/2nZ7RolGw3w?controls=0&amp;start=4",
//   "https://www.youtube.com/embed/yy9ie3eZvc4?controls=0&amp;start=4",
//   "https://www.youtube.com/embed/KwRpUwuCdcA?controls=0",
//   "https://www.youtube.com/embed/efRTosGodyU?controls=0&amp;start=13",
//   "https://www.youtube.com/embed/xzSfCv3u3d0?controls=0&amp;start=15",
//   "https://www.youtube.com/embed/Q1FUzQdbRdw?controls=0",
//   "https://www.youtube.com/embed/7csGhMQoQms?controls=0",
//   "https://www.youtube.com/embed/7CIBlMGrUg8?controls=0",
//   "https://www.youtube.com/embed/2NDdc4xYKX8?controls=0&amp;start=1"
// ];
var schoolSongs = [
  "1gu17MFr5-M",
  "2nZ7RolGw3w",
  "yy9ie3eZvc4",
  "KwRpUwuCdcA",
  "efRTosGodyU",
  "xzSfCv3u3d0",
  "Q1FUzQdbRdw",
  "7csGhMQoQms",
  "7CIBlMGrUg8",
  "2NDdc4xYKX8"
];
var startAt = [0, 4, 4, 0, 13, 15, 0, 0, 0, 1];

/*  uncomment section when ready to build object array  URL to w3schools: https://www.w3schools.com/js/tryit.asp?filename=tryjs_object_constructor */
function School(name, mascot, logo, fightSong, startAt) {
  this.name = name;
  this.mascot = mascot;
  this.logo = logo;
  this.fightSong = fightSong;
  this.startAt = startAt;
  this.getLogo = function() {
    return this.logo;
  };
  this.getSong = function() {
    return this.fightSong;
  };
  this.getStart = function() {
    return this.startAt;
  };
}

var schools = [];
for (var i = 0; i < schoolNames.length; i++) {
  schools[i] = new School(
    schoolNames[i],
    schoolMascots[i],
    schoolLogos[i],
    schoolSongs[i],
    startAt[i]
  );
}

//object.assign(a,b) - combines objects.  create obj with key:values, obj with fn and merge
//OR
//create an object and then instantiate it
//schools[i] = new School()

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
  badGuess = 4,
  gameStart = false,
  winner = "assets/images/winner.gif",
  loser = "assets/images/loser.jpg";
winCount = 0;
var player; //player
/******************************LOGIC*****************************************/

$(document).ready(function() {
  $("#guesses").html(badGuess.toString());
  $("#startBtn").on("click", function() {
    var m = "2nZ7RolGw3w";
    player.loadVideoById(m);
    player.seekTo(10);

    player.playVideo();
    if (!gameStart) {
      resetGame();
      newGame();
    } else {
      if (confirm("Abandon current game?")) {
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

//function for player
function onYouTubeIframeAPIReady() {
  console.log("onyoutubeiframeready");
  player = new YT.Player("schoolSong", {
    width: 600,
    height: 400,
    start: 10,
    videoId: "7csGhMQoQms",
    playerVars: {
      color: "white"
    },
    events: {
      onReady: initialize
    }
  });
}

function initialize() {
  console.log("initialize");
  // Update the controls on load
  updateTimerDisplay();
  updateProgressBar();

  // Clear any old interval.
  clearInterval(time_update_interval);

  // Start interval to update elapsed time display and
  // the elapsed part of the progress bar every second.
  time_update_interval = setInterval(function() {
    updateTimerDisplay();
    updateProgressBar();
  }, 1000);
}
function updateTimerDisplay() {
  // Update current time text display.
  $("#current-time").text(formatTime(player.getCurrentTime()));
  $("#duration").text(formatTime(player.getDuration()));
}

function formatTime(time) {
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}
$("#progress-bar").on("mouseup touchend", function(e) {
  // Calculate the new time for the video.
  // new time in seconds = total duration in seconds * ( value of range input / 100 )
  var newTime = player.getDuration() * (e.target.value / 100);

  // Skip video to new time.
  player.seekTo(newTime);
});
function updateProgressBar() {
  // Update the value of our progress bar accordingly.
  $("#progress-bar").val(
    (player.getCurrentTime() / player.getDuration()) * 100
  );
}

//////////////////////////////////////////////////
function resetGame() {
  $("#schoolSpan").empty();
  $("#letterList").empty();
  $("#schoolPic").attr("src", "assets/images/Unknown.png");
  //school song

  mysteryWord = "";
  $("#winLose").addClass("hide");
  badGuess = 4;
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
  if ((badGuess = 0)) {
    //LOSER
    $("#schoolPic").attr("src", loser);
    gameStart = false;
    return;
  }
  if (mysteryWord === school.mascot) {
    //WINNER
    var myLogo = "assets/images/" + school.getLogo();

    $("#schoolPic").attr("src", myLogo);
    $("#winLose").removeClass("hide");

    gameStart = false;
    winCount++;

    $("#winTotal").html(winCount.toString());
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
  badGuess--;
  tempGuess = badGuess;
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
