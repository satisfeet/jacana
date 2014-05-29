module.exports = function(app) {

  app.get('/order', function* (next) {
    yield this.render('order/index');
  });

  app.get('/order/shipment', function* (next) {
    yield this.render('order/shipment');
  });

  app.get('/order/payment', function* (next) {
    yield this.render('order/payment');
  });

  app.get('/order/confirm', function* (next) {
    yield this.render('order/confirm');
  });

  app.get('/order/goodbye', function* (next) {
    yield this.render('order/goodbye');
  });

};
