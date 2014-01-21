var util = require('util');

var Model = require('../../core/model');

function Item(source) {
  Model.call(this, source);
}

util.inherits(Item, Model);

module.exports = Item;
