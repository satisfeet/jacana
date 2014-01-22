var superagent = require('superagent');

var Product  = require('./model');
var Products = require('./collection');

module.exports = function(app) {

  // requests products if not already done
  app('*', function(context, next) {
    if (context.state.products) return next();

    superagent.get('/products', function(err, res) {
      if (err) throw err;

      context.state.products = res.body;

      next();
    });
  });

  // sets up product collection
  app('*', function(context, next) {
    createProducts(context);

    next();
  });

};

function createProducts(context) {
  var source = context.state.products;

  context.products = new Products(source);
}
