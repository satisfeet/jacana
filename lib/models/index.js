var mongoose = require('mongoose');

module.exports = function(app) {

  var options = app.settings.store;

  require('./product')(app);

  require('./order')(app);

  mongoose.connect(options.url, options.mapper);

};
