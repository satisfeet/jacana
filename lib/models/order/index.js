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
                variations: {
                    type: Object
                },
                quantity: {
                    type: Number
                }
            }    
        ]
    }, {
        versionKey: '_version'   
    });

    require('./methods')(schema);
    require('./statics')(schema);

    mongoose.model('Order', schema);

};
