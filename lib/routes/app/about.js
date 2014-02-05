module.exports = function(app) {

  app.get('/about', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('about/index', {
      title: 'Über uns'
    });
  });

};
