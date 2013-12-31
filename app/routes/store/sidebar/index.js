var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/index.html');

var HelpInfoView    = require('./help/info');
var OrderInfoView   = require('./order/info');
var ProductInfoView = require('./product/info');

function SidebarView(element) {
    this.element = element || domify(template);
 
    createHelpInfoView(this.element, this);
    createOrderInfoView(this.element, this);
    createProductInfoView(this.element, this);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(SidebarView, events.EventEmitter);

SidebarView.prototype.showHelp = function() {
    var element = this.element.querySelector('#help-info');

    if (!element) {
        replace(this.element, this.help);
    }
    
    return this;
};

SidebarView.prototype.showOrder = function(order) {
    var element = this.element.querySelector('#order-info');
 
    this.orderInfoView.show(order);

    if (!element) {
        replace(this.element, this.orderInfoView);
    }

    return this;
};

SidebarView.prototype.showProduct = function(product) {
    var element = this.element.querySelector('#product-info');

    this.productInfoView.show(product);
    
    if (!element) {
        replace(this.element, this.productInfoView);
    }

    return this;
};

SidebarView.prototype.expand = function() {
    var element = this.element;

    element.classList.remove('col-md-4');
    element.classList.add('col-md-12');

    return this;
};

SidebarView.prototype.collapse = function() {
    var element = this.element;

    element.classList.add('col-md-4');
    element.classList.remove('col-md-12');

    return this;
};

module.exports = SidebarView;

function createHelpInfoView(sidebar, view) {
    var element = sidebar.querySelector('#help-info');

    view.helpInfoView = new HelpInfoView(element);
}
function createOrderInfoView(sidebar, view) {
    var element = sidebar.querySelector('#order-info');

    view.orderInfoView = new OrderInfoView(element);
    view.orderInfoView.on('remove', function(product) {
        view.emit('order:remove', product);
    });
    view.orderInfoView.on('proceed', function() {
        view.emit('order:proceed');
    });
}


function createProductInfoView(sidebar, view) {
    var element = sidebar.querySelector('#product-info');

    view.productInfoView = new ProductInfoView(element);
    view.productInfoView.on('push', function(product, variations) {
        view.emit('order:push', product, variations);
    });
}

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="order"]')
        .addEventListener('click', function(e) {
            view.emit('order:show');
        });
}

function replace(element, view) {
    element = element.querySelector('#sidebar-inner');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    element.appendChild(view.element);
}
