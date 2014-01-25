var mongoose = require('mongoose');

module.exports = function(app) {

  var Order = mongoose.model('Order');

  app.get('/orders', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Order.find(req.params.query, function(err, orders) {
      if (err) return next(err);

      res.send(orders);
    });
  });

  app.post('/orders', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Order.create(req.body, function(err, order) {
      if (err) return next(err);

      res.render('mail/notify', order, function(err, html) {
        if (err) return next(err);

        res.submit(order.customer.email, 'satisfeet', html);
      });
      res.send(order);
    });
  });

  app.get('/orders/:id', resolve, function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.order) return res.send(404);

    res.send(req.order);
  });

  app.del('/orders/:id', resolve, function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.order) return res.send(404);

    req.order.remove(function(err) {
      if (err) return next(err);

      res.send(200);
    });
  });

  function resolve(req, res, next) {
    Order.findById(req.params.id, function(err, order) {
      if (err) return next(err);

      req.order = order;

      next();
    });
  }

};
