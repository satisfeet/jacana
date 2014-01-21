module.exports = function(app) {

  app.get('/legal', function(req, res, next) {
    res.render('app/legal/index');
  });

};
