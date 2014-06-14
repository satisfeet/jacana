var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  app.get('/', function* (next) {
    yield this.render('index');
  });

  require('./about')(app);

  require('./legal')(app);

  require('./order')(app);

  require('./stock')(app);


};
