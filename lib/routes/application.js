var mongoose = require('mongoose');

var Product = mongoose.model('Product');

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('index/index', function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });
    
    app.get('/about', function(req, res, next) {
        res.render('about/index', function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });
    
    app.get('/legal', function(req, res, next) {
        res.render('legal/index', function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });
    
    app.get('/store', resolve, function(req, res, next) {
        var context = {
            products: req.products.map(function(product) {
                return product.serialize();
            })
        };

        res.render('store/index', context, function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });

};

function resolve(req, res, next) {
    Product.find(req.query, function(err, products) {
        if (err) return next(err);

        req.products = products;

        next();
    });
}
