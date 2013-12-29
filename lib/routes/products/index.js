var mongoose = require('mongoose');

var Product = mongoose.model('Product');

module.exports = function(app) {
   
    app.get('/products', function(req, res, next) {
        Product.find(req.params.query, function(err, products) {
            if (err) return next(err);

            res.send(products);
        });
    });

    app.post('/products', function(req, res, next) {
        Product.create(req.body, function(err, product) {
            if (err) return next(err);

            res.send(product);
        });
    });

    app.get('/products/:id', resolve, function(req, res, next) {
        if (!req.product) return res.send(404);

        res.send(req.product);
    });

    app.put('/products/:id', resolve, function(req, res, next) {
        if (!req.product) return res.send(404);

        if (req.body.name) {
            req.product.name = req.body.name;
        }
        if (req.body.description) {
            req.product.description = req.body.description;
        }

        res.send(req.product);
    });

    app.del('/products/:id', resolve, function(req, res, next) {
        if (!req.product) return res.send(404);
        
        req.product.remove(function(err) {
            if (err) return next(err);

            res.send(200);
        });
    });

};

function resolve(req, res, next) {
    Product.findById(req.params.id, function(err, product) {
        if (err) return next(err);

        req.product = product;

        next();
    });
}
