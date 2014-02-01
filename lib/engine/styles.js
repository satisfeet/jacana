var less_middleware = require('less-middleware');

module.exports = function(app) {

  var options = app.settings.engine.styles;

  // TODO: fix this hack in lib/config
  options.prefix = '/stylesheets';

  app.use(less_middleware(options));

};
