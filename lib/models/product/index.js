var mongoose = require('mongoose');

module.exports = function(app) {

    var schema = new mongoose.Schema({
        name: {
            type: String
        },
        image: {
            type: Object
        },
        description: {
            type: String
        }
    }, {
        versionKey: '_version'   
    });

    require('./methods')(schema);
    require('./statics')(schema);

    mongoose.model('Product', schema);

};
