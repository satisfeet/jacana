module.exports = function(app) {

  app.post('/orders', function(req, res, next) {
		if (!req.body.payment) return res.json(401);
		if (!req.body.shipment) return res.json(401);

		mailManagement(app, req.body, function(err) {
			if (err) return next(err);

			mailCustomer(app, req.body, function(err) {
				if (err) return next(err);

				res.format({
					json: function() {
						res.json(200, req.body);
					}
				});
			});
		});
  });

};

function mailCustomer(app, order, callback) {
	var options = {};

	options.to = order.payment.email;
	options.from = 'satisfeet <info@satisfeet.me>';
	options.subject = 'Ihre Bestellung auf satisfeet!';

	app.render('../mails/customer', { order: order }, function(err, html) {
		if (err) return callback(err);

		options.html = html;

		app.mailer.sendMail(options, callback);
	});
}

function mailManagement(app, order, callback) {
	var options = {};

	options.to = 'satisfeet <info@satisfeet.me>';
	options.from = 'satisfeet <info@satisfeet.me>';
	options.subject = 'Neue Bestellung eingegangen!';

	app.render('../mails/management', { order: order }, function(err, html) {
		if (err) return callback(err);

		options.html = html;

		app.mailer.sendMail(options, callback);
	});
}
