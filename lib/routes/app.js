var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.model('Product');

  app.get('/', function(req, res, next) {
    if (!req.accepts('text/html')) return next();

    res.render('main/index');
  });

  app.get('/about', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('about/index');
  });

  app.get('/legal', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('legal/index');
  });

  app.get('/order', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/index', {
      orderList: true
    });
  });

  app.get('/order/:step', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/index');
  });

  app.get('/products', function(req, res, next) {
    if (!req.accepts('html')) return next();

    Product.find(req.query, function(err, products) {
      if (err) return next(err);

      res.render('products/index', {
        products: products
      });
    });
  });

  app.get('/products/:id', function(req, res, next) {
    if (!req.accepts('html')) return next();

    Product.findOne(req.params.id, function(err, product) {
      if (err) return next(err);

      res.render('products/index', {
        product: product
      });
    });
  });

};
