/*
 * Create a list that holds all of your cards
 */
var cardList = [];
var activeCard = {};
var moveNum = 0;
var starNum = 3;
var matchNum = 0;
var startTime;
letTheGameBegin();

/**
 * Init the game
 */
function letTheGameBegin() {
  initCardList();
  putCardsOnThePage();
  addPageEvents();
  startTime = new Date().getTime();
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

/**
 * Put cards on desk.
 */
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

/**
 * Add page event listeners.
 */
function addPageEvents() {
  // click on cards
  for (var i = 0; i < cardList.length; i++) {
    cardList[i].dom.addEventListener('click', function (event) {
      cardOnClick(parseInt(event.target.getAttribute('index')));
    })
  }

  // restart function
  var restartButtons = document.querySelectorAll('.restart-button');
  for (var i = 0; i < restartButtons.length; i++) {
    restartButtons[i].addEventListener('click', function () {
      restartGame();
    })
  }
}

var onCardMatching = false; // Whether two cards are in matching process. If true then card clicking is not allowed.

/**
 * Function when a card is clicked.
 * @param  {number} index Index of the card
 */
function cardOnClick(index) {
  var card = cardList[index]
  if (index === activeCard.index || card.isMatch || onCardMatching) { // click on the same card or matched card
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

/**
 * Check if newly opened card is the same with previous card.
 * @param  {Card} card new card
 */
function checkCard(card) {
  if (card.cardType === activeCard.cardType) { // on match
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
    endGame();
  }
}

/**
 * Add move number after one round.
 */
function addMoveNum() {
  document.querySelector('.moves').innerHTML = (++moveNum);
  calculateStars();
}

/**
 * Calculate star numbers.
 */
function calculateStars() {
  if ((moveNum >= 10 && starNum === 3) || (moveNum >= 20 && starNum === 2) || (moveNum >= 30 && starNum === 1)) {
    starNum--;
    removeStar();
  }
}

/**
 * Remove one star.
 */
function removeStar() {
  var starEl = document.querySelectorAll('.fa-star')[starNum];
  if (starEl) {
    removeClass(starEl, 'fa-star');
    addClass(starEl, 'fa-star-o');
  }
}

/**
 * Game over
 */
function endGame() {
  var gameOverMsg = getGameOverMsg();
  document.getElementById('gameover-score-msg').innerHTML = gameOverMsg;
  document.getElementById('time-spend').innerHTML = getTimeSpendString();
  addClass(document.querySelector('.gameover-popup'), 'show');
}

/**
 * Get game over msg shown on popup
 * @return {string} msg
 */
function getGameOverMsg() {
  var msg;
  if (starNum === 3) {
    msg = 'Perfect! You have 3 stars in only ' + moveNum + ' moves!';
  } else if (starNum === 2) {
    msg = '2 stars and ' + moveNum + ' moves. Great!';
  } else if (starNum === 1) {
    msg = 'You get 1 star with ' + moveNum + ' moves. Not too bad.';
  } else if (starNum === 0) {
    msg = 'Ehh. No star for you. Better luck next time!';
  }
  return msg
}

/**
 * Convert time interval to MM:SS format string
 * @return {string} time
 */
function getTimeSpendString() {
  var interval = (new Date().getTime()) - startTime;
  var min = Math.floor((interval / 60000) % 60);
  var sec = Math.floor((interval / 1000) % 60);
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  return (min + ':' + sec)
}

/**
 * Restart the game
 */
function restartGame() {
  // clear data.
  cardList = [];
  moveNum = 0;
  starNum = 3;
  matchNum = 0;
  // clear user interface
  document.querySelector('.moves').innerHTML = '0';
  document.querySelector('.stars').innerHTML = '<li class="star"><i class="fa fa-star"></i></li> <li class="star"><i class="fa fa-star"></i></li> <li class="star"><i class="fa fa-star"></i></li>';
  document.querySelector('.deck').innerHTML = '';
  // close gameover popup
  removeClass(document.querySelector('.gameover-popup'), 'show')
  // restart game
  letTheGameBegin();
}
