var superagent = require('superagent');

module.exports = function(app) {

  app.get('/products', function* (next) {
    var response = yield request(this);

    yield this.render('stock/list', {
      products: response.body
    });
  });

  app.get('/products/:id', function* (next) {
    var response = yield request(this);

    yield this.render('stock/show', {
      product: response.body
    });
  });

};

function request(context) {
  return function(callback) {
    superagent('https://engine.satisfeet.me' + context.path)
      .accept('json')
      .auth('bodokaiser', 'erdbeere71')
      .end(function(err, response) {
        if (err) return callback(err);

        callback(null, response);
      });
  }
}
