var fs         = require('fs');
var path       = require('path');
var uglifyjs   = require('uglify-js');
var browserify = require('browserify');

var templates = require('./templates');

module.exports = function(app) {

    var options = app.settings.engine.builder;

    options.entries.forEach(function(entry, index) {
        options.entries[index] = concatPath(entry);
    });

    app.configure('production', function() {
        createBuilder(app, options)
            .bundle(options, function(err, source) {
                if (err) throw err;

                var result = uglifyjs.minify(source, {
                    fromString: true, compress: true
                });

                createWriter(app, options)
                    .end(result.code);
            });
    });

    app.configure('development', function() {
        app.use(function(req, res, next) {
            if (req.path.indexOf('.js') === -1) {
                return next();
            }

            var writer = createWriter(app, options);
            var builder = createBuilder(app, options);

            writer.on('finish', function() {
                next();
            });

            builder.bundle(options).pipe(writer);
        });
    });

};

function createWriter(app, options) {
    var outputPath = concatPath(options.output);

    return fs.createWriteStream(outputPath);
}

function createBuilder(app, options) {
    var builder = browserify(options);

    builder.transform(templates(app));
 
    return builder
}

function concatPath(postfix) {
    var prefix = path.join(__dirname, '/../../..');

    return path.join(prefix, postfix);
}
