var mongoose = require('mongoose');

module.exports = function(app) {

    var schema = new mongoose.Schema({
        name: String,
        images: {
            main: {
                path: String
            }
        },
        attributes: Object,
        description: {
            preview: String,
            extended: String,
        },
        elements: Object,
        pricing: {
            retail: Number
        }
    }, {
        versionKey: '_version'   
    });

    require('./methods')(app, schema);
    require('./statics')(app, schema);

    mongoose.model('Product', schema);

};
