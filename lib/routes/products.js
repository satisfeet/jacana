module.exports = function(app) {

  app.get('/products', function(req, res, next) {
		var result = app.locals.products = app.products;

		res.format({
			json: function() {
				res.json(200, result);
			},
      html: function() {
        res.render('products/list', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
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

		res.format({
			json: function() {
				res.json(200, result);
			},
			html: function() {
        res.render('products/show', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
			}
		});
  });

};
