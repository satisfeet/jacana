var Orders   = require('./orders');
var Products = require('./products');

module.exports = function(app, context) {
    context.orders = new Orders();
    context.products = new Products();

    context.products.find();
};
