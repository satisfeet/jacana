var superagent = require('superagent');

var Product  = require('./product');
var Products = require('./products');

module.exports = function(app) {

    app.products = new Products();

    app('*', function(context, next) {
        context.products = app.products;

        if (context.products.models.length) {
            return next();
        }

        superagent.get('/products', function(err, res) {
            if (err) throw err;

            res.body.forEach(function(model) {
                context.products.push(model);
            });

            next();
        }); 
    });

};
