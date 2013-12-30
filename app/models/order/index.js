var OrderManager = require('./manager');

module.exports = function(context) {
    context.orderManager = new OrderManager();
};
