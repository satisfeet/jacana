module.exports = function(app) {

  app.get('/about', function(req, res, next) {
    res.render('app/about/index');
  });

};
