var crypto = require('crypto');

module.exports = function(app, mockup) {

    mockup.products.forEach(function(product) {
        product._id = crypto.randomBytes(16).toString('hex');
    });

    require('./collection')(app, mockup);

    require('./model')(app, mockup);

};
