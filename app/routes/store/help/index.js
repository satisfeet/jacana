var domify = require('domify');

var template = require('views/store/help/index.html');

function Help(element) {
  this.element = element.querySelector('#help') || domify(template);
}

module.exports = Help;
