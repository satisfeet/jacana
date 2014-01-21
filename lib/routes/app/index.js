var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.model('Product');

  app.get('/', function(req, res, next) {
    res.render('app/main/index');
  });

  app.get('/about', function(req, res, next) {
    res.render('app/about/index');
  });

  app.get('/legal', function(req, res, next) {
    res.render('app/legal/index');
  });

  app.get('/store', resolve, function(req, res, next) {
    res.render('app/store/index');
  });

  app.get('/store/order', resolve, function(req, res, next) {
    req.context.order = true;

    res.render('app/store/index', req.context);
  });

  app.get('/store/:product', resolve, function(req, res, next) {
    req.context.product = req.context.products.filter(function(product) {
      return product._id.toString() === req.params.product;
    }).shift();

    res.render('app/store/index', req.context);
  });

  function resolve(req, res, next) {
    Product.find(req.query, function(err, products) {
      if (err) return next(err);

      req.context = {};
      req.context.products = products.map(function(product) {
        return product.toJSON();
      });

      next();
    });
  }

};
