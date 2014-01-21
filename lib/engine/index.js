module.exports = function(app) {

  require('./views')(app);

  require('./styles')(app);

  require('./builder')(app);

};
