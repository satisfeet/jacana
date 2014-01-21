module.exports = function(app) {

  require('./app')(app);

  require('./orders')(app);

  require('./products')(app);

};
