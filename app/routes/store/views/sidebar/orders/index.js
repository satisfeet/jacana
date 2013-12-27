var domify = require('domify');

var template = require('../../../../../../usr/views/store/sidebar/orders/index.html');

var Order = require('./order');

function Orders(models, element) {
    this.element = element || domify(template);

    var self = this;
    models.forEach(function(model) {
        self.element.appendChild(new Order(model).element);
    });
}

module.exports = Orders;
