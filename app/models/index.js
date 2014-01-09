var lodash = require('lodash');

module.exports = function(app) {
    
    require('./order')(app);
 
    require('./products')(app);

    app.products.on('order', function(product, options) {
        var object = lodash.merge(product.toJSON(), options);

        app.order.push(object);
    });

};
