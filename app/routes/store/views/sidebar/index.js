var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/index.html');

var HelpInfo    = require('./help/info');
var ProductInfo = require('./product/info');
var OrderList   = require('./order/list');

function Sidebar(element) {
    this.element = element || domify(template);
 
    createHelpInfo(this.element, this);
    createProductInfo(this.element, this);
    createOrderList(this.element, this);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(Sidebar, events.EventEmitter);

Sidebar.prototype.showHelp = function() {
    var element = this.element.querySelector('#help');

    if (!element) {
        replace(this.element, this.help);
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

Sidebar.prototype.listOrders = function(orders) {
    var element = this.element.querySelector('#order-list');
 
    this.orderList.empty();
    this.orderList.list(orders);

    if (!element) {
        replace(this.element, this.orderList);
    }

    return this;
};

module.exports = Sidebar;

function createHelpInfo(sidebar, view) {
    var element = sidebar.querySelector('#help-info');

    view.helpInfo = new HelpInfo(element);
}

function createProductInfo(sidebar, view) {
    var element = sidebar.querySelector('#product-info');

    view.productInfo = new ProductInfo(element);
    view.productInfo.on('click:add', function(product) {
        view.emit('click:product:add', product);
    });
}

function createOrderList(sidebar, view) {
    var element = sidebar.querySelector('#order-list');

    view.orderList = new OrderList(element);
}

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="orders"]')
        .addEventListener('click', function(e) {
            view.emit('click:orders');
        });
}

function replace(element, view) {
    element = element.querySelector('#sidebar-inner');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    element.appendChild(view.element);
}
