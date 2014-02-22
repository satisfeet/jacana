var fade = require('fade');

var Navbar = require('./navbar');

module.exports = function(app) {

  var navbar = document.querySelector('.navbar');
  var content = document.querySelector('#content');

  app('*', function(context, next) {
    context.element = content;

    fade.out(context.element, 200, next);
  });

  app('*', function(context, next) {
    context.navbar = new Navbar(navbar);

    next();
  });

};
