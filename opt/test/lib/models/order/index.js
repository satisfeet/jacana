var mongoose = require('mongoose');

module.exports = function(app) {

  describe('Order', function() {

    var mockup = {
      customer: {
        name: 'Bodo Kaiser',
        email: 'kyogron@googlemail.com',
        address: {
          street: 'Geiserichstraße 3',
          zipcode: 12105
        }
      },
      products: [
        {
        name: 'Standard',
        variations: {
          size: '42-44',
          color: 'blue',
        },
        quantity: 2
      }
      ]
    };

  });

};
