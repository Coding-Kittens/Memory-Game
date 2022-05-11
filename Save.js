let scoresSaves =[];
let scoreBoard = document.querySelector("tbody");
let resetScore = document.querySelector('button[name="clearSave"]');

//checks if there is anything saved and if there is loads it and updates the score board
if (localStorage.SavedScores !== undefined) {
  LoadScores();
  UpdateScoreBoard();
}

//clears localStorage and removes all the scores from the score board
resetScore.addEventListener("click", function () {
  localStorage.clear();
  scoresSaves = [];
  UpdateScoreBoard();
});

//gets the scores from localStorage
function LoadScores() {
  //sets the list to empty so that there are no duplicits
  scoresSaves = [];
  //turns the string to an array of objs
  let arr = JSON.parse(localStorage.SavedScores);

  //adds each obj to scoresSaves
  for (let a of arr) {
    scoresSaves.push(a);
  }
}

///saves the scores so that you can see you previous games
function saveScores() {
  //turns the scoresSaves into a string
  let stringList = JSON.stringify(scoresSaves);
  //stores that string in localStorage
  localStorage.setItem("SavedScores", stringList);
}

//makes a new score obj to add to the scores list
function newScore(gs, turns, mats, diff, time) {
  //creates a temporay obj to add to the scores list
  let tempScore = {};

  //how many cards the game has
  tempScore["GameSize"] = gs;
  //how many turns the player took
  tempScore["Turns"] = turns;
  //how many matches they got
  tempScore["Matches"] = mats;
  //the dificuty the game was set to
  tempScore["Dificulty"] = diff;
  // the time it took the player, if there was a timer
  tempScore["Time"] = time;

  scoresSaves.push(tempScore);
  newTableRow(gs, turns, mats, diff, time);
}

//makes a new table row and add the new score information
function newTableRow(gs, turns, mats, diff, time) {
  //creating the new elements
  let newTr = document.createElement("tr");
  let gameSizeTd = document.createElement("td");
  let turnsTd = document.createElement("td");
  let matchsTd = document.createElement("td");
  let diffTd = document.createElement("td");
  let timesTd = document.createElement("td");

  //setting the innerText of the new elements
  gameSizeTd.innerText = gs;
  turnsTd.innerText = turns;
  matchsTd.innerText = mats;
  diffTd.innerText = diff;
  timesTd.innerText = time;

  //adding them a new table row
  newTr.append(gameSizeTd);
  newTr.append(turnsTd);
  newTr.append(matchsTd);
  newTr.append(diffTd);
  newTr.append(timesTd);

  //adding the new table row to the table of scores
  scoreBoard.append(newTr);
}

///updates the score board at the start of the game
function UpdateScoreBoard() {
  //removes  the table rows in the body if there is any
  let trArr = document.querySelectorAll("tbody tr");
  for (let a of trArr) {
    a.remove();
  }
  //adds a new row for each score in the list
  for (let i = 0; i < scoresSaves.length; i++) {
    newTableRow(
      scoresSaves[i]["GameSize"],
      scoresSaves[i]["Turns"],
      scoresSaves[i]["Matches"],
      scoresSaves[i]["Dificulty"],
      scoresSaves[i]["Time"]
    );
  }
}
