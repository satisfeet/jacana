var clone = require('clone');

var common      = require('../../etc/common');
var context     = require('../../etc/context');
var production  = require('../../etc/production');
var development = require('../../etc/development');

module.exports = function(app) {

    app.configure(function() {
        var settings = clone(common);

        merge(app.settings, settings);
    });

    app.configure(function() {
        app.settings.context = clone(context);
    });

    app.configure('production', function() {
        var settings = clone(production);

        merge(app.settings, settings);
    });

    app.configure('development', function() {
        var settings = clone(development);

        merge(app.settings, settings);
    });

};

function merge(target, source) {
    for (var key in source) {
        var value = source[key];

        if (!target.hasOwnProperty(key)) {
            target[key] = value;
        } else {
            merge(target[key], value);
        }
    }
}
