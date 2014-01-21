var template = require('views/about/content.html');

module.exports = function(app) {

  app('/about', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#about')) {
      element.innerHTML = template;
    }
  });

};
