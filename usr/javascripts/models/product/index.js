var superagent = require('superagent');

var Product  = require('./model');
var Products = require('./collection');

module.exports = function(app) {

  // TODO: move cache to context.state
  // unfortunately context.state is different
  // for each route currently at least
  var cache;

  // requests products if not already done
  app('*', function(context, next) {
    if (cache) return next();

    superagent.get('/products').accept('json').end(function(err, res) {
      if (err) throw err;

      cache = res.body;

      next();
    });
  });

  // sets up product collection
  app('*', function(context, next) {
    context.products = new Products(cache);

    next();
  });

};
