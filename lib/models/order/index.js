var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    invoice: String,
    items: [
      mongoose.modelSchemas.Product
    ],
    pricing: {
      total: Number,
      retail: Number,
      shipment: Number,
      quantity: Number
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
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }, {
    versionKey: '_version'
  });

  require('./statics')(schema);

  require('./middleware')(schema);

  mongoose.model('Order', schema);

};
