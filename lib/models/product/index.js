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
        },
        variations: {
            type: Object
        },
        pricing: {
            value: {
                type: Number
            }
        }
    }, {
        versionKey: '_version'   
    });

    require('./methods')(app, schema);
    require('./statics')(app, schema);

    mongoose.model('Product', schema);

};
