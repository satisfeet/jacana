var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('../../../../../usr/views/store/sidebar/index.html');

var Help    = require('./help');
var Orders  = require('./orders');
var Product = require('./product');

function Sidebar(element) {
    this.element = element || domify(template);
 
    bindToClickEvents(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(Sidebar, events.EventEmitter);

Sidebar.prototype.showHelp = function() {
    var element = this.element.querySelector('#help');

    if (element) {
        new Help(element);
    } else {
        this.replace(new Help());
    }
    
    return this;
};

Sidebar.prototype.showProduct = function(product) {
    var element = this.element.querySelector('#info');
 
    createProduct(element, product, this);   

    if (!element) {
        this.replace(this.info);
    }

    return this;
};

Sidebar.prototype.listOrders = function(orders) {
    var element = this.element.querySelector('#orders');
 
    if (element) {
        new Orders(orders, element);
    } else {
        this.replace(new Orders(orders));
    }

    return this;
};

Sidebar.prototype.replace = function(view) {
    var element = this.element.querySelector('#sidebar-inner');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    element.appendChild(view.element);

    return this;
};

module.exports = Sidebar;

function createProduct(element, model, view) {
    view.info = new Product(model, element);
    view.info.on('click:add', function(model) {
        view.emit('click:product:add', model);
    });
}

function bindToClickEvents(element, view) {
    element.querySelector('button[name="order"]')
        .addEventListener('click', function(e) {
            view.emit('click:orders');
        });
}
