var Layout  = require('./layout'); 
var Content = require('./content');
var Sidebar = require('./sidebar');

module.exports = function(app, context) {
    context.layout = new Layout(context.query('#store'));
    context.content = new Content(context.query('#content'));
    context.sidebar = new Sidebar(context.query('#sidebar'));

    context.sidebar.on('click:orders', function() {
        context.events.emit('orders:list');
    });

    context.content.on('click:product', function(product) {
        context.events.emit('products:show', product);
    });
    context.sidebar.on('click:product:add', function(product) {
        context.events.emit('orders:push', product);
    });

    insertLayout(context);

    setupLayout(context);
};

function insertLayout(context) {
    var element = context.element;

    if (!context.query('#store')) {
        while (element.lastElementChild) {
            element.lastElementChild.remove();
        }
        element.appendChild(context.layout.element);
    }
}

function setupLayout(context) {
    if (context.layout.isNew()) return;

    context.layout
        .empty()
        .append(context.content)
        .append(context.sidebar)
        ;
}
