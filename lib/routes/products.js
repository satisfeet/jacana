var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.model('Product');

  app.get('/products', function(req, res, next) {
    Product.find(req.query, function(err, result) {
      if (err) return next(err);

      res.format({
        json: function() {
          res.json(200, result);
        },
        html: function() {
          res.render('products/list', { title: 'Produkte', products: result });
        }
      });
    });
  });

  app.get('/products/:id', function(req, res, next) {
    Product.findById(req.params.id, function(err, result) {
      if (err) return next(err);
      if (!product) return next();

      res.format({
        json: function() {
          res.json(200, result);
        },
        html: function() {
          res.render('products/show', { title: 'Produkt', product: product });
        }
      });
    });
  });

};
