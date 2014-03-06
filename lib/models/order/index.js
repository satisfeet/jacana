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
      email: {
        type: String,
        required: true
      },
      company: {
        type: String
      },
      surname: {
        type: String,
        required: true
      },
      forename: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      streetNr: {
        type: String,
        required: true
      },
      place: {
        type: String,
        required: true
      },
      zipCode: {
        type: Number,
        required: true
      }
    },
    shipment: {
      surname: {
        type: String,
        required: true
      },
      forename: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      streetNr: {
        type: String,
        required: true
      },
      place: {
        type: String,
        required: true
      },
      zipCode: {
        type: Number,
        required: true
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
