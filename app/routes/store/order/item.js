var domify   = require('domify');
var reactive = require('reactive');

var template = require('views/store/order/item.html');

function OrderItem(model) {
    this.element = domify(template);

    bindToClickEvents(this.element, model, this);

    reactive(this.element, model, this);
}

module.exports = OrderItem;

function bindToClickEvents(element, model, view) {
    element = element.querySelector('button.close');
    element.addEventListener('click', function(e) {
        model.remove();
    });
}
