module.exports = function(app) {

  app.get('/', function(req, res, next) {
    res.format({
      html: function() {
        res.render('main/index', { title: 'Startseite' });
      }
    });
  });

  app.get('/about', function(req, res, next) {
    res.format({
      html: function() {
        res.render('about/index', { title: 'Über uns' });
      }
    });
  });

  app.get('/legal', function(req, res, next) {
    res.format({
      html: function() {
        res.render('legal/index', { title: 'Rechtliches' });
      }
    });
  });

  app.get('/order', function(req, res, next) {
    res.format({
      html: function() {
        res.render('order/index', { title: 'Bestellübersicht' });
      }
    });
  });

  app.get('/order/:step', function(req, res, next) {
    res.format({
      html: function() {
        switch (req.params.step) {
          case 'payment':
            res.render('order/payment', { title: 'Bezahlung' });
            break;
          case 'shipment':
            res.render('order/shipment', { title: 'Versand' });
            break;
          case 'confirm':
            res.render('order/confirm', { title: 'Bestätigung' });
            break;
          case 'goodbye':
            res.render('order/goodbye', { title: 'Vielen Dank' });
            break;
          default: next();
        }
      }
    });
  });

  require('./orders')(app);

  require('./products')(app);

};
