module.exports = function(app) {

  app.get('/', function(req, res, next) {
    res.format({
      html: function() {
        res.render('index');
      }
    });
  });

  app.get('/about', function(req, res, next) {
    res.format({
      html: function() {
        res.render('about');
      }
    });
  });

  app.get('/legal', function(req, res, next) {
    res.format({
      html: function() {
        res.render('legal');
      }
    });
  });

  app.get('/order', function(req, res, next) {
    res.format({
      html: function() {
        res.render('order');
      }
    });
  });

  app.get('/order/:step', function(req, res, next) {
    res.format({
      html: function() {
        res.render('order');
      }
    });
  });

  require('./orders')(app);

  require('./products')(app);

};
