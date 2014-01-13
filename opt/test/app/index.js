var app = {};

app.Product = require('../../app/models/products/model');
app.Products = require('../../app/models/products/collection');

app.Order = require('../../app/models/orders/order');
app.OrderItem = require('../../app/models/orders/item');

module.exports = app;
