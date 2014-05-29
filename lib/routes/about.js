module.exports = function(app) {

  app.get('/about', function* (next) {
    yield this.render('about/index');
  });

};
