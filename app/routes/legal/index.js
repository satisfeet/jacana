var template = require('../../views/legal/content');

module.exports = function(app) {

  app('/legal', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#legal')) {
      element.innerHTML = template;
    }
  });

};
