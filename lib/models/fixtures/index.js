var mongoose = require('mongoose');

var products = require('./products');

module.exports = function(app) {

    var Product = mongoose.model('Product');

    app.configure('development', function() {
        Product.remove({}, function(err) {
            if (err) throw err;
        });
        Product.create(products, function(err) {
            if (err) throw err;
        });
    });

};
