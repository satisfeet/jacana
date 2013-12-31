var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/content/index.html');

var ProductListView = require('./product/list');

function ContentView(element) {
    this.element = element || domify(template);

    createProductListView(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(ContentView, events.EventEmitter);

ContentView.prototype.listProducts = function(products) {
    this.productListView.list(products);

    return this;
};

ContentView.prototype.selectProduct = function(product) {
    this.productListView.select(product);

    return this;
};

module.exports = ContentView;

function createProductListView(content, view) {
    var element = content.querySelector('#product-list');

    view.productListView = new ProductListView(element);
    view.productListView.on('show', function(product) {
        view.emit('product:show', product);
    });

    if (!element) {
        view.element.querySelector('#content-inner')
            .appendChild(view.productListView.element);
    }
}
