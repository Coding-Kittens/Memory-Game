const gameContainer = document.getElementById("game");
let matchIds = [];
//I changed it to let, so that I can do random colors instead of set ones
let COLORS = [];
let restartBtn = document.querySelector("button[name = restart]");
let isPlaying = false;
let cardBackground;//keeps track of what img the back of the cards are suposed to be
let numOfCardsFliped = 0;
let cards = [];
let timeOuts = [];
let isRandomCards =false;
let isDificultyCards =false;

//restarts the game when button is clicked
restartBtn.addEventListener("click",reStart);


//restarts the game
function reStart() {
  //clears the timer
    clearInterval(timmerId);
    //removes the id that changes the poss of the game over screen
gameOverScreen.removeAttribute("id")
//removes the cards from the last game
  clearCards();
  //clears the colors so that the colors from the last game are not in this one
  COLORS = [];
  //if random cards is checked it picks random cards
if(isRandomCards){
  n = randomGameSize();
}
else{
  n = checkWhatCardNum(cardNum);
}
//if random difficulty is checked it a random difficulty
if(isDificultyCards){
  dificultyLevel = randomRange(1, 4);
  //if the dificulty is medium then it picks if it should be a turn limit or time limit
if(dificultyLevel >=2){
  timerOrLimit = randomRange(1,3);
  turnLimit = limists[cardNum-1];
}
}
//resets the dificulty text and timer, for random games
  showGameDificulty.innerText= dificulties[dificultyLevel - 1];
  timeTxt.innerText ="Timer: 00:00";
  timeTxt.classList.add("hiddenObj");

  resetTurnsNMatches();
  isPlaying = false;
  setCards(n);
  StartGame();
}




//starts the game
function StartGame() {
  if (!isPlaying) {
    isPlaying = true;
    //hides the game over screen
    gameOverScreen.classList.add("hiddenObj");
    isGameOver = false;

    //mixes the colors so that the cards are random
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);

//checks if there should be a timer
    if((timerOrLimit == 1 && dificultyLevel>1)||dificultyLevel>2){
      //sets the timeLimit depending on how many cards and the difficulty
      if(dificultyLevel===3){
        timeLimit = times[(cardNum-1)+3];
      }else{
      timeLimit = times[cardNum-1];
      }
      startTimer();
    }
  }
}

//removes the card divs from the game
function clearCards() {
  //sets matchIds to an empty arr so that it clears the ids of the matching cards from the last game
  matchIds = [];
  //removes the cards from last game
  let divArr = document.querySelectorAll("#game div");
  for (let d of divArr) {
    d.remove();
  }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {

  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = randomRange(0,counter);
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let num = 0;
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("id", num);

    setCardImg(newDiv,"sprites/cardBacks/backOfCard.png","sprites/cardBacks/"+cardBackground,"none");
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    num++;
  }
}



///show the correct card image when the card is fliped around
//takes the card you want to flip, the image you want in the for background
//and a background image or a backgroundColor
function setCardImg(card, img, backImg, color) {


//tries to set the image
try {

  if (backImg != "none") {
    card.setAttribute(
      "style",
      `background-image:url(${img}), url(${backImg});background-repeat: no-repeat;background-size:contain,cover`
    );
  } else {
    card.setAttribute(
      "style",
      `background-image: url(${img});background-repeat: no-repeat;background-size:contain`
    );
    //if there is a color then it sets it as the backgroundColor
    if (color != "none") {
      card.style.backgroundColor = color;
    }
  }


} catch (e)
{
  //if there is a problem then it just uses a color
  console.log(e);
  //it uses the color that was passed in or just the color pink if color is none
  if (color != "none") {
    card.style.backgroundColor = color;
  }
  else{
    card.style.backgroundColor = pink;
  }

}



}


///checks cards when card is clicked
function handleCardClick(event) {

//if the card you tried to flip is not a card that is already matched
//and the game is not over then it will flip the card
  if (matchIds.indexOf(event.target.id) === -1 && !isGameOver){
      //keeps track of how many cards are fliped
    numOfCardsFliped++;

    //makes it to where you can't flip over more than 2 cards
    if (numOfCardsFliped < 3) {
      //flips the card over
      FrontFlip(event.target);
    }

// runs if its the first card you clicked or you only click one card
    if (numOfCardsFliped < 2) {
      let timeId = setTimeout(function () {
        for (let c of cards) {
          //flips the card back
          c.classList.remove("CardFace");
          let timeIdtwo = setTimeout(function () {
            setCardImg(
              c,
              "sprites/cardBacks/backOfCard.png",
              "sprites/cardBacks/"+cardBackground,
              "none"
            );
          }, 500);
          //puts the id of the timeout in an array so that it can be cleard
          timeOuts.push(timeIdtwo);
        }
          //resets the num of cards fliped when the card gets fliped back
          //this will only run if you only flip over one card, when you fip over 2 cards it cancels the timeouts
        cards = [];
        numOfCardsFliped = 0;
          //1 card takes one turn if you don't flip over another card
          Updateturns(1);
      }, 5000);
      //puts the id of the timeout in an array so that it can be cleard
      timeOuts.push(timeId);
    }


    if (numOfCardsFliped === 2) {
      //cancels the timeouts from the first card
      for (let t of timeOuts) {
        clearTimeout(t);
      }
      timeOuts = [];
///checks if the two cards match
      let ismatch = match();

//if they don't then they flip back after 3s
      if (!ismatch) {
        setTimeout(function () {
          backFlip();
      //its 3s instead of 1 to acount for the transition that takes 2s to play
        }, 3000);

      }

      //2 cards fliped takes one turns
      //it dosn't count as two because you have to flip over two cards to check them so it only counts as one
      //one card counts as one turn if you take to long to flip over an other card,
      // so that the one card dosn't stay fliped over forever if you don't pick another card
      Updateturns(1);
    }
  }
}

//turns the cards to the back
function backFlip() {
  for (let c of cards) {

    //starts the transition
    c.classList.remove("CardFace");

    setTimeout(function () {
      //sets the background image part way through the transition
      setCardImg(
        c,
        "sprites/cardBacks/backOfCard.png",
        "sprites/cardBacks/"+cardBackground,
        "none"
      );
    }, 500);
  }
  //clears the cards and resets num of cards
  cards = [];
  numOfCardsFliped = 0;
}



///checks if the two cards match
function match() {
  //checks if the cards match and that they are not the same card
  if (
    cards[0].className === cards[1].className &&
    cards[0].id !== cards[1].id
  ) {
//adds the card ids to the list of matching ids, clears the cards and resets num of cards
//it is on a timer so that you have to wait for a bit before you can flip over other cards
//if you could click on them right away, it would make it to where you could click on more than two cards at a time
    setTimeout(function () {
      for (let c of cards) {
        matchIds.push(c.id);
      }
      numOfCardsFliped = 0;
      cards = [];
    }, 500);
    UpdateMatches(1);
    return true;
  }

  return false;
}




let newRex = /CardFace/;
//turns the cards to the front
function FrontFlip(card){
  //adds the card to the cards array
  cards.push(card);
  //sets a string to the color of the card witch is its class name
  let strColor = card.className;
  //makes sure that you only get the color class by checking for the other class that is added to make it flips
  //if it has that other class it gets rid of it in the string not on the card
  if (newRex.test(strColor)) {
    let s = strColor.indexOf(" ");
    strColor = strColor.slice(0, s);
  }
  //sets the variable to the correct image by checking what img goes with the color
  let cardFront = getCardface(strColor);
//starts the transition to flip the card
  card.classList.add("CardFace");

  setTimeout(function () {
    ///sets the image part way through the transition
    setCardImg(
      card,
      "sprites/cardFaces/"+cardFront,
      "none",
      strColor
    );
  }, 500);
}
