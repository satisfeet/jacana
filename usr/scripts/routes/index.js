var fade = require('fade');

module.exports = function(app) {

  require('./main')(app);

  require('./about')(app);

  require('./legal')(app);

  require('./order')(app);

  require('./products')(app);

};
