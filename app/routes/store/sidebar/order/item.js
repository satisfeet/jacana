var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/order/item.html');

function ProductItemView(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(ProductItemView, events.EventEmitter);

ProductItemView.prototype.show = function(order) {
    if (this.element.dataset.id !== order._id) {
        this.element.dataset.id = order._id;
        this.element.querySelector('h5').innerText = order.name;
        this.element.querySelector('p').innerText = util
            .format('Size: %s\nColor: %s', order.variations.size, 
                    order.variations.color);
    }

    return this;
};

module.exports = ProductItemView;

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="remove"]')
        .addEventListener('click', function(e) {
            view.emit('remove');
        });
}
