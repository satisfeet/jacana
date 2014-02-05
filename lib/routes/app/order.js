module.exports = function(app) {

  app.get('/order', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/index');
  });

  app.get('/order/payment', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/payment');
  });

  app.get('/order/shipment', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/shipment');
  });

  app.get('/order/confirm', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/confirm');
  });

  app.get('/order/goodbye', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('order/goodbye');
  });

};
