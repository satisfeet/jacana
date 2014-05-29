var http = require('http');

module.exports = function(app) {

  app.on('error', function(error) {
    if (error.status >= 400 && error.status < 500) return;

    console.error(error);
  });

  app.use(function* (next) {
    try {
      yield next;

      if (this.status === 404 || this.status === null) this.throw(404);
    } catch(error) {
      if (error.expose === false) return;

      this.status = 500;
      this.body = error.stack || error;

      app.emit('error', error, this);
    }
  });

};
