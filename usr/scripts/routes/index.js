module.exports = function(app) {

  require('./start')(app);

  require('./about')(app);

  require('./legal')(app);

  require('./order')(app);

  require('./products')(app);

};
