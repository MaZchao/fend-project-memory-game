// Card class
function Card(cardType) {
  this.cardType = cardType;
  this.cardHtml = generateCardHtml(cardType);
  this.isMatch = false; // match status
}

/**
 * Bind this instance with its specific dom. Making it easier to find.
 * @param  {Object} dom The dom created by this instance.
 */
Card.prototype.bindDom = function (dom) {
  this.dom = dom;
}

/**
 * Open this card.
 */
Card.prototype.open = function () {
  var self = this;
  addClass(this.dom, 'open');
  setTimeout(function() {
    addClass(self.dom, 'show');
  }, 150)
}

/**
 * Close this card when match failed.
 */
Card.prototype.close = function () {
  var self = this;
  removeClass(this.dom, 'open');
  setTimeout(function() {
    removeClass(self.dom, 'show');
  }, 150)
}

/**
 * Match this card.
 */
Card.prototype.match = function() {
  addClass(this.dom, 'match')
  this.isMatch = true;
}

/**
 * generate card's html string from card type
 * @param  {string} cardType card's type
 * @return {string}          card's html
 */
function generateCardHtml(cardType) {
  return '<i class="fa fa-' + cardType + '"></i>';
}

function hasClass(el, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

function addClass(el, className) {
  if (!hasClass(el, className)) {
    var newClasses = el.className.split(' ');
    newClasses.push(className);
    el.className = newClasses.join(' ');
  }
}

function removeClass(el, className) {
  if (hasClass(el, className)) {
    var oldClasses = el.className.split(' ');
    var newClasses = [];
    for (var i = 0; i < oldClasses.length; i++) {
      if (oldClasses[i] !== className) {
        newClasses.push(oldClasses[i]);
      }
    }
    el.className = newClasses.join(' ');
  }
}
