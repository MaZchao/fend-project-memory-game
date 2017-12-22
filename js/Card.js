// Card class
function Card(cardType) {
  this.cardType = cardType;
  this.cardHtml = generateCardHtml(cardType);
}

Card.prototype.bindDom = function (dom) {
  this.dom = dom;
}

Card.prototype.open = function () {
  var self = this;
  addClass(this.dom, 'open');
  setTimeout(function() {
    addClass(self.dom, 'show');
  }, 150)
}

Card.prototype.close = function () {
  var self = this;
  removeClass(this.dom, 'open');
  setTimeout(function() {
    removeClass(self.dom, 'show');
  }, 150)
}

Card.prototype.match = function() {
  addClass(this.dom, 'match')
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
