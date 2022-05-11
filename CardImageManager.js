//all of the posible images for the faces of the card
//I wanted to just load them from the folder they were in, but I couldn't figure out how :/
const posibleCardFaces = [
  "wolfSkeleton.png",
  "beverLion.png",
  "blueCottenTail.png",
  "bunnyLepord.png",
  "cat.png",
  "coffeeCat.png",
  "cuteMushroom.png",
  "deerFox.png",
  "Draco.png",
  "flowerAlian.png",
  "flowerDeer.png",
  "foxBird.png",
  "foxPup.png",
  "frogCow.png",
  "goatDragon.png",
  "hummingBirdChameleon.png",
  "kittys.png",
  "lizbird.png",
  "lizbirdSleeping.png",
  "mushroomRose.png",
  "narwhal.png",
  "owlCat.png",
  "peacockCat.png",
  "pianoBird.png",
  "pizzaPinguins.png",
  "pumpkinPatch.png",
  "ruby.png",
  "salimanderDog.png",
  "sleepingStrawberryosaurus.png",
  "snakeDuck.png",
  "starryCottenTailedDear.png",
  "strawberryosaurus.png",
  "stringfoot.png",
  "unicornCat.png",
  "coffee.png",
  "Latte.png",
  "expreso.png",
  "mocha.png",
  "milk.png",
  "coffeePress.png",
];
//all posible images for the backs of the cards
const posibleCardBacks = [
  "aspenForest.png",
  "background forest.png",
  "forest_Desert.png",
  "glowingLakeNight.png",
  "lavenderFeilds.png",
  "mountainTavern.png",
  "mushroomForest.png",
  "night.png",
  "northernLights.png",
  "snowy.png",
  "tavern.png",
  "wizardVillage.JPG",
];

//not compleaty random colors so that they are not ugly and don't blend too mutch
const posibleColors = [
  "mediumVioletRed",
  "hotPink",
  "darkRed",
  "lightCoral",
  "lightSlateGrey",
  "lemonChiffon",
  "seaGreen",
  "limeGreen",
  "mediumSpringGreen",
  "teal",
  "midnightBlue",
  "deepSkyBlue",
  "darkOrchid",
  "thistle",
  "purple",
  "rebeccaPurple",
  "azure",
  "orange",
  "gold",
  "orangeRed",
  "cyan",
];
// an obj that has all of the cards in it so the game knows what color goes with what image
let cardObjs = {};
let currentNumOfCards;

///picks a random game size
function randomGameSize() {
  let n = randomRange(1, 4);
  let num = checkWhatCardNum(n);
  return num;
}

//checks how many cards for the game size
function checkWhatCardNum(n) {
  let num = 0;
  switch (n) {
    case 1:
      num = 7;
      break;
    case 2:
      num = 14;
      break;
    case 3:
      num = 21;
      break;
    default:
      num = 7;
      break;
  }
  return num;
}

//adds the random cards to the cards obj
function setCards(num) {
  currentNumOfCards = num;

  //clears cards from previous game
  cardObjs = {};

  //sets a random background for the back of the cards
  cardBackground = randomCards(posibleCardBacks, 1);

  //picks random colors and pictures for the front of the cards
  let tempColors = randomCards(posibleColors, num);
  let temparr = randomCards(posibleCardFaces, num);

  //makes an object for the cards so that when fliping the cards it knows what pic goes with what color
  for (let i = 0; i < tempColors.length; i++) {
    cardObjs[tempColors[i]] = temparr[i];
  }

  // dubbles the colors and sets them to the color arry used in the game
  //since there is only one of each color, it has to dubble them so there is a matching card
  for (let c of tempColors) {
    //dubbles the colors by adding it twice
    COLORS.push(c);
    COLORS.push(c);
  }
}

///gives a number of random items from the cardArr
function randomCards(cardArr, num) {
  let arr = [];
  //shuffles the arr so that it is random
  shuffle(cardArr);

  //if you want more than one random item
  if (num > 1) {
    // it gives you the first x items from the list
    for (let i = 0; i < num; i++) {
      arr.push(cardArr[i]);
    }
    return arr;
  }
  //if you just want one random item it picks a random index and give that item to you;
  return cardArr[randomRange(0, cardArr.length)];
}

//gets the img that goes with a certain color
function getCardface(colorName) {
  //looks for the color in the obj
  for (let o in cardObjs) {
    if (o === colorName) {
      return cardObjs[o];
    }
  }
  //if it can't find it, the image will be a question mark
  //the color would still be on the card so you can still play the game
  return "backOfCard.png";
}

//gives a random value from the min num to the max num
function randomRange(min, max) {
  let isrand = false;
  let num = 0;
  while (!isrand) {
    num = Math.floor(Math.random() * max);
    //if the num picked is less than the minimum then it pick a different num
    if (num >= min) {
      isrand = true;
    }
  }

  return num;
}
