var swig = require('swig');

module.exports = function(app) {

  var options = app.settings.engine.views;

  app.configure(function() {
    app.set('view engine', 'html');
    app.set('view cache', false);
    app.set('views', options.path);

    app.engine('html', swig.renderFile);
  });

};
