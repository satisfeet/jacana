var domify = require('domify');

var template = require('views/store/help/index.html');

function Help(element) {
  this.element = element.querySelector('#help');

  setupElement(this.element, this);
}

module.exports = Help;

function setupElement(element, view) {
  if (element) return;

  view.element = domify(template);
}
