// Card class
function Card(cardType) {
  this.cardType = cardType;
  this.cardHtml = generateCardHtml(cardType);
}

Card.prototype.bindDom = function(dom) {
  this.dom = dom;
}

/**
 * generate card's html string from card type
 * @param  {string} cardType
 * @return {string}          card's html
 */
function generateCardHtml(cardType) {
  return '<i class="fa fa-' + cardType + '"></i>';
}
