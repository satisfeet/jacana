var swig          = require('swig');
var html_minifier = require('html-minifier');

module.exports = function(app) {

  var options = app.settings.engine.views;

  app.configure(function() {
    app.set('view engine', 'html');
    app.set('view cache', false);
    app.set('views', options.path);

    app.engine('html', function(filename, context, callback) {
      swig.renderFile(filename, context, function(err, result) {
        if (err) return callback(err);

        callback(null, minify(result, options.minify));
      });
    });
  });

};

function minify(source, options) {
  return html_minifier.minify(source, options);
}
