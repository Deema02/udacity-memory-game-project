let cardsList = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bomb",
  "fa-bomb",
  "fa-bicycle",
  "fa-bicycle"
];
let openCards = [];
let cardMatch = [];
const deck = document.querySelector(".deck");
let docFrag = document.createDocumentFragment();
let areOpen = 0;

let moves = 0;
const movesCounter = document.querySelector(".moves");
const stars = document.querySelector(".stars").childNodes;

let seconds = 0;
let minutes = 0;
let timer = document.querySelector(".timer");
let interval;
const modal = document.querySelector(".winModal");

const restart = document.querySelector(".restart");

const modalTime = document.querySelector(".modalTime");
const modalRating = document.querySelector(".modalRating");
const modalMoves = document.querySelector(".modalMoves");
const modalStars = document.querySelector(".stars");

startGame();

//This function flips the card (opens it)
function showCard(evt) {
  let clickedCard = evt.target;
  //If the clicked card isn't already open & not an already matched card
  if (!clickedCard.classList.contains("open", "show", "match") && openCards.length < 2) {
    //Open the card
    clickedCard.classList.add("open", "show");
    openCards.push(clickedCard);

    //If there are 2 open cards, check if they match
    if (openCards.length === 2) {
      numOfMoves();

      //If the cards match
      if (openCards[0].innerHTML === openCards[1].innerHTML) {
        matchedCards();

        //If the cards don't match
      } else {
        setTimeout(unmatchedCards, 800);
      }
    }
    youWin();
  }
}

function matchedCards() {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");

  cardMatch.push(openCards[0]);
  cardMatch.push(openCards[1]);

  openCards = [];
}

function unmatchedCards() {
  openCards[0].classList.remove("open", "show");
  openCards[1].classList.remove("open", "show");
  openCards = [];
}

//Number of moves
function numOfMoves() {
  moves++;
  if (moves === 1) {
    startTimer();
    movesCounter.innerHTML = `1 Move`;
  } else {
    movesCounter.innerHTML = ` ${moves} Moves`;
  }
  starRating();
}

//Star rating
function starRating() {
  if (moves === 10) {
    stars[5].classList.add("greyedOut");
  } else if (moves === 20) {
    stars[3].classList.add("greyedOut");
  }
}

//The cards are created and added to the deck
function createDeck() {
  deck.innerHTML = "";
  for (let card of cardsList) {
    let cardItem = document.createElement("li");
    cardItem.classList.add("card");
    cardItem.innerHTML = `<i class="fa ${card}"></i>`;
    docFrag.appendChild(cardItem);
  }
  deck.appendChild(docFrag);

  let allCards = document.querySelectorAll(".card");

  //If a card is clicked, it is shown
  for (let card of allCards) {
    card.addEventListener("click", showCard);
  }
}

//Winning message
function youWin() {
  if (cardMatch.length === 16) {
    modalTime.innerHTML = timer.innerHTML;
    modalRating.innerHTML = modalStars.innerHTML;
    modalMoves.innerHTML = movesCounter.innerHTML;
    clearInterval(interval);
    modal.style.display = "block";
  }
}

//Start the timer
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = `${minutes} min & ${seconds} sec`;
    seconds++;

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Start the game
function startGame() {
  modal.style.display = "none";
  openCards = [];
  cardMatch = [];
  moves = 0;
  movesCounter.innerHTML = `0 Moves`;
  cardsList = shuffle(cardsList);
  createDeck();

  stars[5].classList.remove("greyedOut");
  stars[3].classList.remove("greyedOut");

  timer = document.querySelector(".timer");
  timer.innerHTML = " 0 min & 0 sec";
  clearInterval(interval);
}

/**************************************************************************/
/* Instructions:
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
