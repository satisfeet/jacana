var mongoose = require('mongoose');

var Product = mongoose.model('Product');

module.exports = function(app) {

    app.get('/store', resolve, function(req, res, next) {
        res.render('app/store/index', req.context, function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });

    app.get('/store/order', resolve, function(req, res, next) {
        req.context.order = true;

        res.render('app/store/index', req.context, function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });
    
    app.get('/store/:product', resolve, function(req, res, next) {
        req.context.product = req.context.products.filter(function(product) {
            return product._id.toString() === req.params.product;
        }).shift();

        res.render('app/store/index', req.context, function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });

};

function resolve(req, res, next) {
    Product.find(req.query, function(err, products) {
        if (err) return next(err);

        req.context = {
            server: true, client: false,
            products: products.map(function(product) {
                return product.serialize();
            })
        };

        next();
    });
}
