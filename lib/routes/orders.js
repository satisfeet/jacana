var mongoose = require('mongoose');

module.exports = function(app) {

  var Order = mongoose.model('Order');

  app.post('/orders', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Order.create(req.body, function(err, order) {
      if (err) return next(err);

      // NOTE: Why can't I send the order in parallel?
      app.render('mails/notify', { order: order }, function(err, html) {
        if (err) return next(err);

        app.mailer.sendMail({
          from: 'satisfeet <info@satisfeet.me>',
          to: order.payment.email,
          subject: 'Ihre Bestellung bei satisfeet',
          html: html
        }, function(err) {
          if (err) return next(err);

          app.mailer.sendMail({
            from: 'satisfeet <info@satisfeet.me>',
            to: 'info@satisfeet.me',
            subject: 'Neue Bestellung eingegangen',
            html: html
          }, function(err) {
            if (err) return next(err);

            res.send(order);
          });
        });
      });
    });
  });

};
