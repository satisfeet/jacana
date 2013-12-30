var superagent = require('superagent');

function ProductManager() {

}

ProductManager.prototype.find = function(query, callback) {
    superagent.get('/products').query(query).end(function(err, res) {
        if (err) return callback(err);

        callback(null, res.body);
    });

    return this;
};

ProductManager.prototype.findOne = function(query, callback) {
    superagent.get('/products/' + query._id).query(query).end(function(err, res) {
        if (err) return callback(err);

        callback(null, res.body);
    });
};

module.exports = ProductManager;
