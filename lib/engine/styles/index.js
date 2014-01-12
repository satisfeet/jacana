var less_middleware = require('less-middleware');

module.exports = function(app) {

    var options = app.settings.engine.styles;

    app.use(less_middleware(options));

};
