var compiler = require('./compiler');

module.exports = function(app) {

    app.configure('production', function() {
        compileFiles(app, function(err) {
            if (err) throw err;
        });
    });
    
    app.configure('development', function() {
        app.use(function(req, res, next) {
            if (req.path.indexOf('.css') === -1) {
                return next();
            }

            compileFiles(app, function(err) {
                if (err) return next(err);

                next();
            });
        });
    });

};

function compileFiles(app, callback) {
    var options = app.settings.engine.styles;

    options.files.forEach(function(file) {
        compiler.compile(file, callback);
    });
}
