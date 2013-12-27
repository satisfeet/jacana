var path  = require('path');
var swig  = require('swig');
var clone = require('clone');

module.exports = function(app) {
    
    var defaults = createDefaults(app);

    app.engine('html', swig.renderFile);

    app.configure(function() {
        var viewPath = createViewPath(app);

        app.set('view engine', 'html');
        app.set('view cache', false);
        app.set('views', viewPath);
    });

    app.configure('development', function() {
        defaults.cache = false;
    });

    app.configure(function() {
        swig.setDefaults(defaults);

        app.swig = createForBuilder(app);
    });

};

function createDefaults(app) {
    var defaults = app.settings.engine.views;

    defaults.locals = app.settings.context;

    return defaults;
}
function createForBuilder(app) {
    var context = clone(app.settings.context);

    context.client = true;

    return new swig.Swig({
        locals: context
    });
}

function createViewPath(app) {
    var prePath = path.join(__dirname, '/../../../');

    return path.join(prePath, app.settings.engine.views.path);
}
