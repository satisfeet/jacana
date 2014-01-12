var mongoose = require('mongoose');

module.exports = function(app) {

    var options = app.settings.store;
 
    require('./order')(app);

    require('./product')(app);

    mongoose.connect(options.url, options.mapper);

};
