var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.model('Product');

  app.get('/products', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Product.find(req.params.query, function(err, products) {
      if (err) return next(err);

      res.send(products);
    });
  });

  app.get('/products/:id', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Product.findById(req.params.id, function(err, product) {
      if (err) return next(err);
      if (!product) return res.send(404);

      res.send(product);
    });
  });

};
