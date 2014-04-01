module.exports = function(app) {

  app.get('/products', function(req, res, next) {
		var result = app.products;

		res.format({
			json: function() {
				res.json(200, result);
			},
			html: function() {
				res.render('index');
			}
		});
  });

  app.get('/products/:name', function(req, res, next) {
		var result = app.products.filter(function(product) {
			return product.name === req.params.name;
		});

		if (!result.length) {
			return next();
		}

		res.format({
			json: function() {
				res.json(200, result[0]);
			},
			html: function() {
				res.render('index');
			}
		});
  });

};
