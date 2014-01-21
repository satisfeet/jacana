var superagent = require('superagent');

var Product = require('./model');
var Products = require('./collection');

module.exports = function(app) {

    app.products = new Products();

    app('*', function(context, next) {
        context.products = app.products;

        if (context.products.models.length || app.offline) {
            return next();
        }

        superagent.get('/products', function(err, res) {
            if (err) return context.events.emit('error', err);

            res.body.forEach(function(source) {
                var model = new Product(source);

                context.products.push(model);
            });

            next();
        });
    });

};
