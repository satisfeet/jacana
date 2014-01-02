var mongoose = require('mongoose');

var Order = mongoose.model('Order');

module.exports = function(app) {
   
    app.get('/orders', function(req, res, next) {
        Order.find(req.params.query, function(err, orders) {
            if (err) return next(err);

            res.send(orders);
        });
    });

    app.post('/orders', function(req, res, next) {
        Order.create(req.body, function(err, order) {
            if (err) return next(err);

            order.notify(function(err) {
                if (err) return next(err);

                res.send(order);
            });
        });
    });

    app.get('/orders/:id', resolve, function(req, res, next) {
        if (!req.order) return res.send(404);

        res.send(req.order);
    });

};

function resolve(req, res, next) {
    Order.findById(req.params.id, function(err, order) {
        if (err) return next(err);

        req.order = order;

        next();
    });
}
