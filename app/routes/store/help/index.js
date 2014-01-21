var domify = require('domify');

var template = require('views/store/help/index.html');

function Help(model, element) {
  this.element = element || domify(template);
}

module.exports = Help;
