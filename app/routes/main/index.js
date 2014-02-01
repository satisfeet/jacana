var swig = require('swig');

var template = require('../../../var/views/app/main/content.html');

module.exports = function(app) {

  app('/', function(context, next) {
    var element = context.element;

    if (!element.querySelector('#main')) {
      element.innerHTML = template;
    }
  });

};
