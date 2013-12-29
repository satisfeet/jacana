var mongoose = require('mongoose');

module.exports = function(app) {

    var schema = new mongoose.Schema({
        customer: {
            type: Object
        },
        products: {
            type: Array
        }
    }, {
        versionKey: '_version'   
    });

    require('./methods')(schema);
    require('./statics')(schema);

    mongoose.model('Order', schema);

};
