module.exports = function(app) {

  app.get('/legal', function *(next) {
    yield this.render('legal/index');
  });

};
