var fs         = require('fs');
var jadeify    = require('jadeify');
var uglifyify  = require('uglifyify');
var browserify = require('browserify');

module.exports = function(app) {

  var options = app.settings.engine.builder;

  app.configure('production', function() {
    // TODO: execute this only once
    // TODO: let this be safely done BEFORE handing requests
    var writer = createWriter(app, options);
    var builder = createBuilder(app, options);

    builder.bundle(options).pipe(writer);
  });

  app.configure('development', function() {
    app.get('/javascripts/build.js', function(req, res, next) {
      var writer = createWriter(app, options);
      var builder = createBuilder(app, options);

      builder.bundle(options).on('error', next)
        .pipe(writer.on('finish', next));
    });
  });

};

function createWriter(app, options) {
  return fs.createWriteStream(options.output);
}

function createBuilder(app, options) {
  var builder = browserify(options);

  app.configure(function() {
    builder.add(options.entry);
    builder.transform(jadeify);
  });
  app.configure('production', function() {
    builder.transform({ global: true }, uglifyify);
  });

  return builder
}
