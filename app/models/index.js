var lodash = require('lodash');

module.exports = function(app) {
    
    require('./orders')(app);
 
    require('./products')(app);

    app.products.on('order', function(product, options) {
        var item = app.order.createItem(product, options);

        app.order.addItem(item);
    });

};
