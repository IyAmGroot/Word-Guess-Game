var schoolNames = [
  "Alabama",
  "James Madison University",
  "Louisiana State University",
  "Michigan",
  "Texas",
  "Ohio State",
  "UCLA",
  "Notre Dame",
  "University of Oklahoma",
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
  "SOONERS",
  "HOKIES"
];
var schoolLogos = [
  "alabama-crimson-tide-1-logo-png-transparent.png",
  "james-madison-dukes-2-logo-png-transparent.png",
  "lsu-tigers-logo-png-transparent.png",
  "Michigan_Wolverines_Logo.svg.png",
  "texas.png",
  "ohio-state-university-logo-png-1.png",
  "UCLA.png",
  "1200px-Notre_Dame_Leprechaun_logo.svg.png",
  "OU.jpg",
  "VT.png"
];

var schoolSongs = [
  "1gu17MFr5-M",
  "2nZ7RolGw3w",
  "iSy4Ox8ndzs",
  "KwRpUwuCdcA",
  "efRTosGodyU",
  "xzSfCv3u3d0",
  "93aPuPxNQqU",
  "7csGhMQoQms",
  "qILOCvvF-cA",
  "2NDdc4xYKX8"
];

var startAt = [18, 6.5, 8, 0, 13, 15, 0, 0, 11, 1];

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
  gameStart = false,
  winner = "assets/images/winner.gif",
  loser = "assets/images/Loser.jpg";
loserTune = "_asNhzXq72w";
winCount = 0;
var player;
var badGuess = 4;
/******************************LOGIC*****************************************/

$(document).ready(function() {
  $("#guesses").html(badGuess.toString());
  $("#startBtn").on("click", function() {
    if (!gameStart) {
      resetGame();
      newGame();
    } else {
      if (confirm("Abandon current game?")) {
        resetGame();
        newGame();
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

/////////////////////////functions for player//////////////////////////////////
function onYouTubeIframeAPIReady() {
  console.log("onyoutubeiframeready");
  player = new YT.Player("schoolSong", {
    width: 0,
    height: 0,
    start: 0,
    videoId: "7csGhMQoQms",
    playerVars: {
      color: "white"
    },
    events: {
      onReady: initialize
    }
  });
}
//function for player
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
//function for player
function updateTimerDisplay() {
  // Update current time text display.
  $("#current-time").text(formatTime(player.getCurrentTime()));
  $("#duration").text(formatTime(player.getDuration()));
}
//function for player
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
  // player.seekTo(newTime);
});
//function for player
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
  player.loadVideoById("");

  mysteryWord = "";
  $("#winLose").addClass("hide");
  badGuess = 4;
}
function newGame() {
  // SELECT RANDOM SCHOOL
  school = schools[Math.floor(Math.random() * schools.length)];
  $(".ballCounter").attr("class", "ballCounter");
  //Set School Name Here
  $("#schoolSpan").html(school.name);

  //Populate Underscores
  initializeMysteryWord();

  //Load school song
  school.getStart();
  player.cueVideoById(school.getSong(), school.getStart());

  gameStart = true;
}
function isGameOver() {
  if (badGuess == 0) {
    player.loadVideoById(loserTune);
    player.playVideo();
    //LOSER
    $("#schoolPic").attr("src", loser);
    gameStart = false;
    return;
  }
  if (mysteryWord === school.mascot) {
    //WINNER
    player.playVideo();
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
  $("#guesses").html(tempGuess);
  var ball = "#ball" + tempGuess;
  $(ball).addClass("hide");
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
