var template = require('../../views/about');

module.exports = function(app) {

  app('/about', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#about')) {
      element.innerHTML = template();
    }
  });

};
