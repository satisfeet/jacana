var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('../../../../../usr/views/store/content/index.html');

var ProductView = require('./product');

function Content(element) {
    this.element = element || domify(template);

    events.EventEmitter.call(this);
}

util.inherits(Content, events.EventEmitter);

Content.prototype.empty = function() {
    var element = this.element;

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    return this;
};

Content.prototype.listProducts = function(models) {
   var elements = [].slice.call(this.element.children);

    var self = this;
    models.forEach(function(model) {
        var element = elements.filter(function(element) {
            if (element.dataset.id === model._id) {
                return element;
            }
        }).shift();

        createProductView(element, model, self);
    });

    return this;
};

Content.prototype.select = function(model) {
    var elements = [].slice.call(this.element.children);

    elements.forEach(function(element) {
        if (element.dataset.id === model._id) {
            element.classList.add('selected');
        } else {
            element.classList.remove('selected');
        }
    });

    return this;
};

module.exports = Content;

function createProductView(element, model, view) {
    var productView = new ProductView(model, element);

    if (!element) {
        view.element.appendChild(productView.element);
    }

    productView.on('click', function(model) {
        view.select(model);

        view.emit('click:product', model);
    });
}
