var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.model('Product');

  app.get('/products', function(req, res, next) {
    if (!req.accepts('html')) return next();

    Product.find(req.query, function(err, products) {
      if (err) return next(err);

      res.render('products/list', {
        title: 'Produktübersicht',
        products: products
      });
    });
  });

  app.get('/products/:id', function(req, res, next) {
    if (!req.accepts('html')) return next();

    Product.findOne(req.params.id, function(err, product) {
      if (err) return next(err);

      res.render('products/show', {
        title: 'Produktansicht',
        product: product
      });
    });
  });

};
