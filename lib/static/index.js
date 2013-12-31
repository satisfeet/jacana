var st      = require('st');
var path    = require('path');
var express = require('express');

module.exports = function(app) {

    var options = resolveOptions(app);

    app.use(st(options));

};

function resolveOptions(app) {
    var options = app.settings.static;

    options.passthrough = true;
    options.path = path.join(__dirname, '/../..', options.path);

    return options;
}
