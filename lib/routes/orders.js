var mongoose = require('mongoose');

module.exports = function(app) {

  var Order = mongoose.model('Order');

  app.post('/orders', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Order.create(req.body, function(err, order) {
      if (err) return next(err);

      /* TODO: rewrite mail templates in jade
      res.render('mail/notify', order, function(err, html) {
        if (err) return next(err);

        res.submit(order.customer.email, 'satisfeet', html);
      });
      */

      res.send(order);
    });
  });

};
