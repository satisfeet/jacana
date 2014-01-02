var mongoose = require('mongoose');

module.exports = function(app, mockup) {

    var Order = mongoose.model('Order');
    
    describe('methods', function() {

        var order;

        before(function() {
            order = new Order(mockup);
        });

        describe('#notify', function() {

            it.only('should notify customer', function(done) {
                order.notify(function(err) {
                    if (err) throw err;

                    done();
                });
            });

        });

    });

};
