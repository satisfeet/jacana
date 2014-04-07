module.exports = function(app) {

  app.get('/products', function(req, res, next) {
		var result = app.locals.products = app.products;

    res.status(200);
		res.format({
			json: function() {
				res.json(result);
			},
      html: function() {
        res.render('products/list');
      }
		});
  });

  app.get('/products/:name', function(req, res, next) {
		var result = app.locals.product = app.products.filter(function(product) {
			return product.name === req.params.name;
		}).pop();

		if (!result) {
			return next();
		}

    res.status(200);
		res.format({
			json: function() {
				res.json(result);
			},
			html: function() {
        res.render('products/show');
			}
		});
  });

};
