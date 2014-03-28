var util = require('util');

module.exports = function(schema) {

  schema.pre('save', function(next) {
    if (!this.isNew) return next();

    var year = new Date().getFullYear();

    var order = this;
    this.constructor.countYear(year, function(err, result) {
      if (err) return next(err);

      var invoice = util.format('%d-%d', year, result + 1);
      order.set('invoice', invoice);

      next();
    });
  });

};
