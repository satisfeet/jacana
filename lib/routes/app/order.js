module.exports = function(app) {

  app.get('/order', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/index', {
      title: 'Bestellübersicht'
    });
  });

  app.get('/order/payment', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/payment', {
      title: 'Rechnungsinformationen'
    });
  });

  app.get('/order/shipment', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/shipment', {
      title: 'Versandinformationen'
    });
  });

  app.get('/order/confirm', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/confirm', {
      title: 'Bestellbestätigung'
    });
  });

  app.get('/order/goodbye', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/goodbye', {
      title: 'Vielen Dank'
    });
  });

};
