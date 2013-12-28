var path     = require('path');
var through  = require('through');
var aliasify = require('aliasify');

module.exports = function(app) {

    var options = resolveOptions(app);

    return aliasify.configure(options);

};

function resolveOptions(app) {
    var aliases = app.settings.engine.builder.aliases;
    var rootDirectory = path.join(__dirname, '/../../../');

    return {
        aliases: aliases,
        configDir: rootDirectory
    };
}
