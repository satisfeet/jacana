var template = require('../../../templates/about');

module.exports = function(app) {

  app('/about', function(context, next) {
    context.navbar.setBrand('Über Uns');

    if (!context.element.querySelector('#about')) {
      context.element.innerHTML = template();
    }
  });

};
