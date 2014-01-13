var mongoose = require('mongoose');

module.exports = function(app) {

    var schema = new mongoose.Schema({
        customer: {
            name: String,
            email: String,
            address: {
                street: String,
                streetNr: String,
                zipcode: Number,
                place: String
            }
        },
        pricing: {
            shipment: Number,
            retail: Number,
            total: Number
        },
        items: [
            {
                name: String,
                attributes: Object,
                quantity: Number,
                pricing: Number
            }    
        ]
    }, {
        versionKey: '_version'   
    });

    require('./methods')(app, schema);
    require('./statics')(app, schema);

    mongoose.model('Order', schema);

};
