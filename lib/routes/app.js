var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.model('Product');

  app.get('/', function(req, res, next) {
    if (!req.accepts('text/html')) return next();

    res.render('app/main/index');
  });

  app.get('/about', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('app/about/index');
  });

  app.get('/legal', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('app/legal/index');
  });

  app.get('/order', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('app/order/index');
  });

  app.get('/products', function(req, res, next) {
    if (!req.accepts('html')) return next();

    Product.find(req.query, function(err, products) {
      if (err) return next(err);

      res.render('app/products/index', {
        products: products
      });
    });
  });

  app.get('/products/:id', function(req, res, next) {
    if (!req.accepts('html')) return next();

    Product.findOne(req.params.id, function(err, product) {
      if (err) return next(err);

      res.render('app/products/index', {
        product: product
      });
    });
  });

};
