var ProductManager = require('./manager');

module.exports = function(context) {
    context.productManager = new ProductManager();
};
