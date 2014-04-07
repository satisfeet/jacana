module.exports = function(app) {

  app.get('/', function(req, res, next) {
    res.format({
      html: function() {
        res.render('start', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
      }
    });
  });

  app.get('/about', function(req, res, next) {
    res.format({
      html: function() {
        res.render('about', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
      }
    });
  });

  app.get('/legal', function(req, res, next) {
    res.format({
      html: function() {
        res.render('legal', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
      }
    });
  });

  app.get('/order', function(req, res, next) {
    res.format({
      html: function() {
        res.render('order/list', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
      }
    });
  });

  app.get('/order/:step', function(req, res, next) {
    res.format({
      html: function() {
        res.render('order/list', function(err, html) {
          if (err) return next(err);

          res.render('layout', { content: html });
        });
      }
    });
  });

  require('./orders')(app);

  require('./products')(app);

};
