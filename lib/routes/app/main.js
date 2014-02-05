module.exports = function(app) {

  app.get('/', function(req, res, next) {
    if (!req.accepts('text/html')) return next();

    res.render('main/index', {
      title: 'Startseite'
    });
  });

};
