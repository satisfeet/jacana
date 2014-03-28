module.exports = function(app) {

  app.get('/products', function(req, res, next) {
		var result = app.locals.products;

		res.format({
			json: function() {
				res.json(200, result);
			},
			html: function() {
				res.render('products/list', { title: 'Produkte' });
			}
		});
  });

  app.get('/products/:name', function(req, res, next) {
		var result = app.locals.products.filter(function(product) {
			return product.name === req.params.name;
		});

		if (result.length) {
			result = result.pop();
		} else {
			return next();
		}

		res.format({
			json: function() {
				res.json(200, result);
			},
			html: function() {
				res.render('products/show', { title: 'Produkt', product: product });
			}
		});
  });

};
