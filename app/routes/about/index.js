var template = require('../../views/about/content');

module.exports = function(app) {

  app('/about', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#about')) {
      element.innerHTML = template;
    }
  });

};
