var mongoose = require('mongoose');

module.exports = function(app) {

    connectStore(app);
 
    require('./order')(app);

    require('./product')(app);

};

function connectStore(app) {
   var url = app.settings.store.url;
   var options = app.settings.store.mapper;

   return mongoose.connect(url, options);
}
