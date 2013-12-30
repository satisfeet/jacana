var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/product/info.html');

function ProductInfoView(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(ProductInfoView, events.EventEmitter);

ProductInfoView.prototype.show = function(product) {
    this.model = product;

    if (this.element.dataset.id !== product._id) {
        this.element.dataset.id = product._id;
        this.element.querySelector('p').innerText = product.description;
    }

    return this;
};

module.exports = ProductInfoView;

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="add"]')
        .addEventListener('click', function(e) {
            view.emit('click:add', view.model);
        });
}
