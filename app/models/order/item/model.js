var util    = require('util');
var exempel = require('exempel');

function Item(source) {
  exempel.Model.call(this, source);

  listenToChangeEvent(this);
}

util.inherits(Item, exempel.Model);

module.exports = Item;

function listenToChangeEvent(model) {
  model.on('change:pricing.quantity', function(quantity) {
    var total = quantity * model.get('pricing.retail');

    model.set('pricing.total', total);
  });
}
