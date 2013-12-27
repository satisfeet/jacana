var domify = require('domify');

var template = require('../../../../../../usr/views/store/sidebar/orders/order.html');

function Order(model, element) {
    this.element = element || domify(template);

    this.element.querySelector('h5')
        .innerText = model.name;
}

module.exports = Order;
