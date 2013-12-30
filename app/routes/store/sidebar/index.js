var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/index.html');

var HelpInfo    = require('./help/info');
var OrderInfo   = require('./order/info');
var ProductInfo = require('./product/info');

function Sidebar(element) {
    this.element = element || domify(template);
 
    createHelpInfo(this.element, this);
    createOrderInfo(this.element, this);
    createProductInfo(this.element, this);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(Sidebar, events.EventEmitter);

Sidebar.prototype.showHelp = function() {
    var element = this.element.querySelector('#help-info');

    if (!element) {
        replace(this.element, this.help);
    }
    
    return this;
};

Sidebar.prototype.showOrder = function(order) {
    var element = this.element.querySelector('#order-info');
 
    this.orderInfo.show(order);

    if (!element) {
        replace(this.element, this.orderInfo);
    }

    return this;
};

Sidebar.prototype.showProduct = function(product) {
    var element = this.element.querySelector('#product-info');

    this.productInfo.show(product);
    
    if (!element) {
        replace(this.element, this.productInfo);
    }

    return this;
};

module.exports = Sidebar;

function createHelpInfo(sidebar, view) {
    var element = sidebar.querySelector('#help-info');

    view.helpInfo = new HelpInfo(element);
}
function createOrderInfo(sidebar, view) {
    var element = sidebar.querySelector('#order-info');

    view.orderInfo = new OrderInfo(element);
    view.orderInfo.on('click:submit', function() {
        view.emit('click:order:submit');
    });
    view.orderInfo.on('click:product:remove', function(product) {
        view.emit('click:order:product:remove', product);
    });
}


function createProductInfo(sidebar, view) {
    var element = sidebar.querySelector('#product-info');

    view.productInfo = new ProductInfo(element);
    view.productInfo.on('click:add', function(product) {
        view.emit('click:product:add', product);
    });
}

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="order"]')
        .addEventListener('click', function(e) {
            view.emit('click:order');
        });
}

function replace(element, view) {
    element = element.querySelector('#sidebar-inner');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    element.appendChild(view.element);
}
