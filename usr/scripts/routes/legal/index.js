var fade = require('fade');

var template = require('../../views/legal');

module.exports = function(app) {

  app('/legal', function(context, next) {
    context.navbar.setBrand('Rechtliches');

    if (!context.element.querySelector('#legal')) {
      context.element.innerHTML = template();
    }

    fade.in(context.element);
  });

};
