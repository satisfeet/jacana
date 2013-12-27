var util       = require('util');
var events     = require('events');
var superagent = require('superagent');

function Product() {
    this.url = '/products';
}

util.inherits(Product, events.EventEmitter);

Product.prototype.find = function(query) {
    var self = this;

    superagent.get(this.url).query(query).end(function(err, res) {
        if (err) return self.emit('error');

        self.emit('find', res.body);
    });

    return this;
};

module.exports = Product;
