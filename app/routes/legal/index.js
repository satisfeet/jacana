var template = require('../../views/legal');

module.exports = function(app) {

  app('/legal', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#legal')) {
      element.innerHTML = template();
    }
  });

};
