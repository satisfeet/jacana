var should = require('should');

module.exports = function(bin) {

    describe('orders', function() {

        require('./persist')(bin);
        
        require('./remove')(bin);

    });

};
