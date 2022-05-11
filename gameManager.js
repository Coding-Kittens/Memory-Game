//this controls the game menus,scores and navigation

/////arrays

let dificulties = ["Easy", " Medium", "Hard"];

//descriptions of what each difficulty is like
let descriptions = [
  "There is no turn limit, the game ends when you match all of the cards.",
  "The game ends after a turn limit or after a timer, try to get as many matchs as you can.",
  "There is a turn limit and a timer, the game ends on witchever comes first.",
];
//card images for showing how many cards you want in a game
let cardNumImgs = [
  "sprites/menu/cards.png",
  "sprites/menu/cards2.png",
  "sprites/menu/cards3.png",
];
//turn limits based off of how many cards are in the game and what difficulty
let limists =[18,30,55,12,24,35];
//timer length based off of how many cards are in the game and what difficulty
let times =[240,360,480,150,210,330];

/////nums

let timerOrLimit; // I used a num instead of a bool so I could randomize it easier
//counters
let numOfTurns = 0;
let numOfMatches = 0;
///
let turnLimit;
let timeLimit;
let dificultyLevel = 1;
let cardNum = 1;
let timmerId;

//bools
let isGameOver = false;

// images
let cImg = document.querySelector("#cImg");//card image in game selector
let logo = document.querySelector(".CodingKittens");

//sections
let memoryGameContainer = document.querySelector("#memoryGame");// card game section
let mainMenu = document.querySelector("#mainMenu");
let gameMenu = document.querySelector("#gameSelector");// section where you pick what type of game, Ex: easy with 14 cards, or random
let scores = document.querySelector("#highScorePage");
let gameOverScreen = document.querySelector(".GameOver");
let form = document.querySelector("form");//form for picking what type of game in game selector

//buttons
let gameBtn = document.querySelector("button[name='newGame']");
let scoresBtn = document.querySelector("button[name='highScores']");
let menuBtn = document.querySelector("button[name='Menu']");
let radioBtn = document.querySelectorAll("input[name='timerOrTurnLimit']");// turn limit or timer, radio btn in game selector
let ranCards = document.querySelector("input[name='randomCards']");

//text
let showGameDificulty = document.querySelector("#txtDiff");
let descritpionTxt = document.querySelector(".explanitoryText");
let diffTxt = document.querySelector("button[name='dificultyBtn']");
let cTxt = document.querySelector("h3");//card text in game selector
let turnTxt = document.querySelector("#turnTxt");
let matchTxt = document.querySelector("#matchTxt");
let timeTxt = document.querySelector("#timmer");


////intro "logo"

//makes the "logo" visible
setTimeout(function(){
logo.classList.remove("hiddenObj");
},600);

// make the "logo" bigger
setTimeout(function(){
logo.classList.add("BiggerImg");
},1000);

//deletes the "logo", I don't need it anymore
setTimeout(function() {
logo.remove();
//goes to start menu
toMainMenu();
},4000);
////





form.addEventListener("click", function (event) {
  //changes the dificulty level
  if (event.target.name === "dificultyBtn") {
    nextBtn(dificultyLevel, "Not");
  }
//changes the card image, if the card is random
  if(event.target.name ==="randomCards" && ranCards.checked){
    cImg.src ="sprites/menu/cards4.png";
  }
else if (event.target.tagName === "IMG" && !ranCards.checked) {
  //changes the amount of cards in the game
    nextBtn(cardNum, "card");
  }


});


////sets the game up acording to user input in the form
form.addEventListener("submit", function (event) {
  event.preventDefault();

//random checkboxs
  let ranDificulty = document.querySelector("input[name='randomDificulty']");

//sets the cards to random if checked
isRandomCards =ranCards.checked;

//sets the dificulty to random if checked
isDificultyCards = ranDificulty.checked;



///resets timmer text
timeTxt.innerText ="Timer: 00:00";
timeTxt.classList.add("hiddenObj");


//check the dificulty and sets the timer and turn limit if needed
///probably not the best way of doing this, but is better than what I had before
switch (dificultyLevel) {
  default: // defaults to the first case
  case 1:
  //resets turn text
    turnTxt.innerText = "Turn: 0/";
      break;


  case 2:
  //tries to get the value from the radio button
  ///to see if there should be a turn limit or a timer
  try {
    timerOrLimit = document.querySelector(
      "input[name='timerOrTurnLimit']:checked"
    ).value;
  } catch (e) {
    //if the player does not set a value, or there is an error, it picks a random one
    console.log("value was not set");
    timerOrLimit = randomRange(1, 3);
  }

  //checks if it is set a turn limit
    if (timerOrLimit == 2) {
      //gets the turn limit
      turnLimit = limists[cardNum - 1];

      //resets turn text
      //turn text is different if there is a turn limit
      turnTxt.innerText = "Turn: 0/" + turnLimit;
    }
//if it is a timer it shows the timer
    else {
      timeTxt.classList.remove("hiddenObj");
    }
    break;


  case 3:
    timeTxt.classList.remove("hiddenObj");
    turnLimit = limists[(cardNum - 1)+3];
    turnTxt.innerText = "Turn: 0/" + turnLimit;
    break;
}

///goes to the start levle
toStartGame();

//starts the game
// it calls restart instead of start so it resets the game cards if you play more than once
reStart();
});


//menu buttons takes you to the different menus
gameBtn.addEventListener("click", toGameSelect);
scoresBtn.addEventListener("click", toHightScores);
menuBtn.addEventListener("click", toMainMenu);

//sets all menus to not visible
function noMenus() {
  memoryGameContainer.classList.add("hiddenObj");
  mainMenu.classList.add("hiddenObj");
  gameMenu.classList.add("hiddenObj");
  scores.classList.add("hiddenObj");
  menuBtn.classList.add("hiddenObj");
  gameOverScreen.classList.add("hiddenObj");

}

//takes you to the game
function toStartGame(){
  noMenus();
    memoryGameContainer.classList.remove("hiddenObj");
    menuBtn.classList.remove("hiddenObj");
}

//takes you to the main menu
function toMainMenu() {
  noMenus();
  mainMenu.classList.remove("hiddenObj");
  if(timmerId !== undefined){
      clearInterval(timmerId);
  }

}

//takes you to the game select menu
function toGameSelect() {
  noMenus();
  gameMenu.classList.remove("hiddenObj");
  menuBtn.classList.remove("hiddenObj");
}

//takes you to the highScores menu
function toHightScores() {
  noMenus();
  scores.classList.remove("hiddenObj");
  menuBtn.classList.remove("hiddenObj");
}



///takes the dificulty or card num and updates the text for it
function nextBtn(num, whatType) {
  //loops Through the options
  let n = loopThrough(num, 3);

  if (whatType === "card") {
    cardNum = n;
    //checks how many cards Ex: if cardNum is three then the num of cards is 42
    cTxt.innerText = checkWhatCardNum(n) * 2 + " cards";
    //changes the card image so that the card visual somewhat"matches" the num of cards
    cImg.src = cardNumImgs[n - 1];
  } else {
    if (n === 2) {
      //if the difficulty is Medium
      //show the buttons to pick timer or turn limits, by unhiding the labels of each of the radio btns
      for (let r of radioBtn) {
        r.parentElement.classList.remove("hiddenObj");
      }
    } else {
      //if the difficulty is not Medium
      //then it hides the btns
      for (let r of radioBtn) {
        r.parentElement.classList.add("hiddenObj");
      }
    }
    //sets the dificulty and the text that shows the dificulty
    dificultyLevel = n;
    descritpionTxt.innerText = descriptions[n - 1];
    diffTxt.innerText = dificulties[n - 1];
    showGameDificulty.innerText= dificulties[n - 1];
  }
}


//adds to the num and if it is grater than the max num then sets it back to 1;
function loopThrough(num, maxNum) {
  num++;
  if (num > maxNum) {
    num = 1;
  }
  return num;
}

//makes a timer
let time;

function startTimer() {
  //shows the timer
 timeTxt.classList.remove("hiddenObj");
 //sets the time to the time limit
 time = timeLimit;

timmerId = setInterval(function() {
  //counts down the time
time--;

//updates the time text to show a time that makes sense to the player
//the time is set in seconds, so it sets it to how many min and sec it would be
timeTxt.innerText = `Timer: ${Math.floor(time/60)}:${((time%60).toFixed(2))}`;
//when the timer hits 0 it clears the interval and sets game over
if(time<=0)
{
  clearInterval(timmerId);
  //checks if game Over has already been called, like if the player hit the turn limit first
  if(!isGameOver){
setTimeout(GameOver,1000);
isGameOver = true;
  }
}
},1000);

}
/////

//resets the num of turns and matches to 0 and updates the text
function resetTurnsNMatches(){
  numOfTurns = 0;
  numOfMatches = 0;

//checks the difficulty and if there is a turn limit
// the turn text is different if there is a turn limit
  if(dificultyLevel >1 && (dificultyLevel > 2 || timerOrLimit == 2)){

  turnTxt.innerText = "Turn: 0/" + turnLimit;
  }
  else
  {
    turnTxt.innerText = "Turn: 0";
  }

  matchTxt.innerText = "Matches: 0";
}

// adds to the num of turns and updates text
function Updateturns(num) {
  numOfTurns += num;

  //checks if there is a turn limit
  if(dificultyLevel > 1 && (dificultyLevel > 2 || timerOrLimit == 2)){
 turnTxt.innerText = `Turn:${numOfTurns}/${turnLimit}`;
 //checks if the num of turns is = to the turn limit and if game over has not been called already
    if(numOfTurns>=turnLimit && !isGameOver){
      //sets game over
      setTimeout(GameOver,1000);
      isGameOver = true;
    }

  }
  else{
    turnTxt.innerText = `Turn:${numOfTurns}`;
  }
}


// adds to the num of matches and updates text
function UpdateMatches(num) {
  numOfMatches += num;
  matchTxt.innerText = "Matches: " + numOfMatches;


  //checks if the num of matches = the max num of matches you can get for the num of cards that you are playing with
  //currentNumOfCards is the number of cards without the duplicits
  if(numOfMatches===currentNumOfCards && !isGameOver){
setTimeout(GameOver,1000);
isGameOver = true;
  }
}

///sets game over and saves the game
function GameOver()
{


  //shows the game Over Screen
gameOverScreen.setAttribute("id","moveObj");
gameOverScreen.classList.remove("hiddenObj");

//clears the timer if there is one
  clearInterval(timmerId);

  //sets the values for the score board
time = (timeLimit-time);
let n =numOfTurns;
if(dificultyLevel > 1 && (dificultyLevel > 2 || timerOrLimit == 2))
{
  n = n+'/'+turnLimit
}

//this will show up as NaN:NaN/NaN:NaN  if there is no timer for the game
// like if its set to easy where there is no timer
let t =`${Math.floor(time/60)}:${((time%60).toFixed(2))}/${Math.floor(timeLimit/60)}:${((timeLimit%60).toFixed(2))}`;
let c = (currentNumOfCards*2)+" cards"
  newScore(c,n,numOfMatches,dificulties[dificultyLevel-1],t);
  //saves the score
  saveScores();
}
