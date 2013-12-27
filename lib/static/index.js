var path    = require('path');
var express = require('express');

module.exports = function(app) {

    var staticPath = createStaticPath(app);

    app.use(express.static(staticPath, app.settings.static));

};

function createStaticPath(app) {
    var prePath = path.join(__dirname, '/../../');

    return path.join(prePath, app.settings.static.path);
}
