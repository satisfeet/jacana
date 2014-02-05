module.exports = function(app) {

  app.get('/legal', function(req, res, next) {
    if (!req.accepts('text/html')) return next();

    res.render('legal/index', {
      title: 'Rechtliches'
    });
  });

};
