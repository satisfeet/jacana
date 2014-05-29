var views  = require('koa-views');
var lessie = require('koa-lessie');

module.exports = function(app) {

  if (app.env === 'production') {
    app.use(require('koa-conditional-get')());
    app.use(require('koa-logger')());
    app.use(require('koa-etag')());
  }

  app.use(views(app.views.path, app.views));

  app.use(lessie(app.styles));

  if (app.env !== 'production') {
    app.use(require('koa-static')(app.static.path));
  }

};
