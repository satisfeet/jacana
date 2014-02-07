var page   = require('page');
var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/order/shipment');

function Shipment(element, model) {
  this.element = domify(template({
    order: model.toJSON()
  }));

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Shipment;

function listenToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    var shipment = model.get('shipment');
    lodash.forEach(e.target.elements, function(element) {
      if (element instanceof HTMLInputElement) {
        shipment.set(element.name.split('-').join('.'), element.value);
      }
    });

    page('/order/confirm');
  });
}
