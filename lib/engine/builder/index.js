var fs         = require('fs');
var path       = require('path');
var uglifyify  = require('uglifyify');
var browserify = require('browserify');

module.exports = function(app) {

    var options = resolveOptions(app);

    app.configure('production', function() {
        var builder = createBuilder(app, options);
        var writer = createWriter(app, options);

        builder.bundle(options).pipe(writer);
    });

    app.configure('development', function() {
        app.use(function(req, res, next) {
            if (req.path.indexOf('.js') === -1) return next();

            var writer = createWriter(app, options);
            var builder = createBuilder(app, options);

            var bundle = builder.bundle(options);

            bundle.on('error', next);
            writer.on('finish', next);
            
            bundle.pipe(writer);
        });
    });

};

function createWriter(app, options) {
    return fs.createWriteStream(options.output);
}

function createBuilder(app, options) {
    var builder = browserify(options);

    app.configure(function() {
        builder.transform(require('./templates')(app));
        builder.transform(require('./aliases')(app));
    });
    app.configure('production', function() {
        builder.transform({ global: true }, uglifyify);
    });
 
    return builder
}

function resolveOptions(app) {
    var options = app.settings.engine.builder;

    options.entries.forEach(function(entry, index) {
        entry = path.join(__dirname, '/../../..', entry);

        options.entries[index] = entry;
    });

    options.output = path.join(__dirname, '/../../..', options.output);

    return options;
}
