module.exports = function(app) {

  require('./product')(app);

  require('./order')(app);

};
