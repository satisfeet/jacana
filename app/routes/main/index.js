var template = require('../../views/main');

module.exports = function(app) {

  app('/', function(context, next) {
    context.navbar.setBrand('Startseite');

    if (!context.element.querySelector('#main')) {
      context.element.innerHTML = template();
    }
  });

};
