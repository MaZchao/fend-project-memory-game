/*
 * Create a list that holds all of your cards
 */
var cardList = [];
letTheGameBegin();

/**
 * Init the game
 */
function letTheGameBegin() {
  initCardList();
  putCardsOnThePage();
}

/**
 * Generate cards then then put them into cardList and shuffle the list
 */
function initCardList() {
  var cardTypes = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']; // all the card types(img types)
  for (var i = 0;i < cardTypes.length; i++) {
    var n = 1;
    while(n <= 2) {
      cardList.push(new Card(cardTypes[i]));
      n++;
    }
  }
  cardList = shuffle(cardList);
}

function putCardsOnThePage() {
  for (var i = 0; i < cardList.length; i++) {
    var dom = document.createElement('li');
    dom.classList = 'card';
    var card = cardList[i];
    dom.innerHTML = card.cardHtml;
    card.bindDom(dom);
    document.querySelector('.deck').appendChild(dom);
  }
  console.log(cardList);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
