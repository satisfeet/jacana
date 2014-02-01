var template = require('../../views/main/content.html');

module.exports = function(app) {

  app('/', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#main')) {
      element.innerHTML = template;
    }
  });

};
