var mongoose = require('mongoose');

module.exports = function(app, mockup) {

    var Order = mongoose.model('Order');
    
    describe('methods', function() {

        var order;

        before(function() {
            order = new Order(mockup);
        });

    });

};
