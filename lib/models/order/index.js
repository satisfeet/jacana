var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    items: [
      mongoose.modelSchemas.Product
    ],
    pricing: {
      total: Number,
      retail: Number,
      shipment: Number
    },
    payment: {
      name: {
        last: String,
        first: String,
        company: String
      },
      address: {
        street: String,
        streetNr: String,
        place: String,
        zipCode: Number
      }
    },
    shipment: {
      name: {
        last: String,
        first: String,
        company: String
      },
      address: {
        street: String,
        streetNr: String,
        place: String,
        zipCode: Number
      }
    },
  }, {
    versionKey: '_version'
  });

  mongoose.model('Order', schema);

};
