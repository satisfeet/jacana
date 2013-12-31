var path            = require('path');
var less_middleware = require('less-middleware');

module.exports = function(app) {

    var options = resolveOptions(app);

    app.configure('production', function() {
        options.once = true;
        options.compress = true;
        options.yuicompress = true;
    });
    
    app.configure('development', function() {
        options.force = true;
    });

    app.configure(function() {
        app.use(less_middleware(options));
    });

};

function resolveOptions(app) {
    var options = app.settings.engine.styles;

    options.src = path.join(__dirname, '/../../../', options.input);
    options.dest = path.join(__dirname, '/../../../', options.output);

    return options;
}
