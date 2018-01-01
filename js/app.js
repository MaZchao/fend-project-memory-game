/*
 * Create a list that holds all of your cards
 */
var cardList = [];
var activeCard = {};
var moveNum = 0;
var starNum = 3;
var matchNum = 0;
letTheGameBegin();

/**
 * Init the game
 */
function letTheGameBegin() {
  initCardList();
  putCardsOnThePage();
  addPageEvents();
}

/**
 * Generate cards then then put them into cardList and shuffle the list
 */
function initCardList() {
  var cardTypes = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']; // all the card types(img types)
  for (var i = 0; i < cardTypes.length; i++) {
    var n = 1;
    while (n <= 2) {
      cardList.push(new Card(cardTypes[i]));
      n++;
    }
  }
  cardList = shuffle(cardList);
}

function putCardsOnThePage() {
  for (var i = 0; i < cardList.length; i++) {
    var dom = document.createElement('li');
    dom.className = 'card';
    var card = cardList[i];
    dom.innerHTML = card.cardHtml;
    dom.setAttribute('index', i);
    card.bindDom(dom);
    card.index = i
    document.querySelector('.deck').appendChild(dom);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addPageEvents() {
  for (let i = 0; i < cardList.length; i++) {
    cardList[i].dom.addEventListener('click', function (event) {
      cardOnClick(parseInt(event.target.getAttribute('index')));
    })
  }
}

var onCardMatching = false;
/**
 *
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
function cardOnClick(index) {
  console.log(index)
  console.log(activeCard)
  var card = cardList[index]
  if (index === activeCard.index || card.isMatch || onCardMatching) { // click on the same card or matched card
    console.log('return!');
    return;
  }
  card.open();
  if (!activeCard.cardType) { // new move
    activeCard = card;
  } else {
    onCardMatching = true;
    setTimeout(function () { // check the card after the card shows
      checkCard(card);
      onCardMatching = false;
    }, 300)
  }
}

function checkCard(card) {
  if (card.cardType === activeCard.cardType) { // on match
    console.log('sucesss')
    card.match();
    activeCard.match();
    matchNum++;
  } else { // not match
    activeCard.close();
    card.close();
  }
  activeCard = {}; // clear the active card variable
  addMoveNum();
  if (matchNum === 8) { // all cards are matched
    alert('游戏完成！');
  }
}

function addMoveNum() {
  document.querySelector('.moves').innerHTML = (++moveNum);
  calculateStars();
}

function calculateStars() {
  if ((moveNum >= 10 && starNum === 3) || (moveNum >= 20 && starNum === 2) || (moveNum >= 30 && starNum === 1)) {
    starNum--;
    removeStar();
  }
}

function removeStar() {
  var starEl = document.querySelectorAll('.fa-star')[starNum];
  if (starEl) {
    addClass(starEl, 'disable')
  }
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
