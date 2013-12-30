var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/content/index.html');

var ProductList = require('./product/list');

function Content(element) {
    this.element = element || domify(template);

    createProductList(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(Content, events.EventEmitter);

Content.prototype.listProducts = function(products) {
    this.productList.list(products);

    return this;
};

Content.prototype.selectProduct = function(product) {
    this.productList.select(product);

    return this;
};

module.exports = Content;

function createProductList(content, view) {
    var element = content.querySelector('#product-list');

    view.productList = new ProductList(element);
    view.productList.on('click:product', function(product) {
        view.emit('click:products:product', product);
    });

    if (!element) {
        view.element.querySelector('#content-inner')
            .appendChild(view.productList.element);
    }
}
