var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/index.html');

var HelpInfoView    = require('./help/info');
var OrderInfoView   = require('./order/info');
var ProductInfoView = require('./product/info');

function Sidebar(element) {
    this.element = element || domify(template);
 
    createHelpInfoView(this.element, this);
    createOrderInfoView(this.element, this);
    createProductInfoView(this.element, this);

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
 
    this.orderInfoView.show(order);

    if (!element) {
        replace(this.element, this.orderInfoView);
    }

    return this;
};

Sidebar.prototype.showProduct = function(product) {
    var element = this.element.querySelector('#product-info');

    this.productInfoView.show(product);
    
    if (!element) {
        replace(this.element, this.productInfoView);
    }

    return this;
};

module.exports = Sidebar;

function createHelpInfoView(sidebar, view) {
    var element = sidebar.querySelector('#help-info');

    view.helpInfoView = new HelpInfoView(element);
}
function createOrderInfoView(sidebar, view) {
    var element = sidebar.querySelector('#order-info');

    view.orderInfoView = new OrderInfoView(element);
    view.orderInfoView.on('click:submit', function() {
        view.emit('click:order:submit');
    });
    view.orderInfoView.on('click:product:remove', function(product) {
        view.emit('click:order:product:remove', product);
    });
}


function createProductInfoView(sidebar, view) {
    var element = sidebar.querySelector('#product-info');

    view.productInfoView = new ProductInfoView(element);
    view.productInfoView.on('click:add', function(product) {
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
