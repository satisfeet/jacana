var util    = require('util');
var exempel = require('exempel');

function Item(source) {
  exempel.Model.call(this, source);
}

util.inherits(Item, exempel.Model);

module.exports = Item;
