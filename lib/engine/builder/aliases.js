var path     = require('path');
var clone    = require('clone');
var through  = require('through');
var aliasify = require('aliasify');

module.exports = function(app) {

    var options = resolveOptions(app);

    return aliasify.configure(options);

};

function resolveOptions(app) {
    var options = clone(app.settings.engine.builder);
   
    for (var key in options.aliases) {
        var value = options.aliases[key];

        options.aliases[key] = path.join(__dirname, '/../../..', value);
    }
    options.configDir = path.join(__dirname, '/../../..');

    return options;
}
