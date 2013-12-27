var products    = require('./products');
var application = require('./application');

module.exports = function(app) {

    require('./products')(app);

    require('./application')(app);

};
