var Navbar = require('./navbar');

module.exports = function(app) {

  var navbar = document.querySelector('.navbar');
  var content = document.querySelector('#content');

  app('*', function(context, next) {
    context.element = content;

    next();
  });

  app('*', function(context, next) {
    context.navbar = new Navbar(navbar);

    next();
  });

};
