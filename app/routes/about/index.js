var fade = require('fade');

var template = require('../../views/about');

module.exports = function(app) {

  app('/about', function(context, next) {
    context.navbar.setBrand('Über Uns');

    if (!context.element.querySelector('#about')) {
      context.element.innerHTML = template();
    }

    fade.in(context.element);
  });

};
