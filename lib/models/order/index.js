var mongoose = require('mongoose');

module.exports = function(app) {

    var schema = new mongoose.Schema({
        customer: {
            name: {
                type: String
            },
            email: {
                type: String
            },
            address: {
                street: {
                    type: String
                },
                zipcode: {
                    type: Number
                }
            }
        },
        products: [
            {
                name: {
                    type: String      
                },
                variation: {
                    type: Object
                },
                quantity: {
                    type: Number
                },
                pricing: {
                    value: {
                        type: Number
                    }
                }
            }    
        ],
        price: {
            type: Number
        }
    }, {
        versionKey: '_version'   
    });

    require('./methods')(app, schema);
    require('./statics')(app, schema);

    mongoose.model('Order', schema);

};
