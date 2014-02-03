var jade = require('jade');

module.exports = function(app) {

  var options = app.settings.engine.views;

  app.configure(function() {
    app.set('view engine', 'jade');
    app.set('view cache', false);
    app.set('views', options.path);

    app.engine('jade', jade.renderFile);
  });

};
