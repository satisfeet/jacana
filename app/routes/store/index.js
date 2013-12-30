var Layout  = require('./layout'); 
var Content = require('./content');
var Sidebar = require('./sidebar');

module.exports = function(app) {
      
    app('/store', function(context, next) {
        context.content = createContent(context);
        context.sidebar = createSidebar(context);
        context.layout = createLayout(context);
        
        context.events.on('products:found', function(products) {
            context.content.listProducts(products);
        }).emit('products:find');
        
        context.sidebar.on('click:order', function() {
            context.events.once('orders:foundOne', function(order) {
                if (order) return context.sidebar.showOrder(order);

                context.events.once('orders:created', function(order) {
                    context.sidebar.showOrder(order);
                }).emit('orders:create');
            }).emit('orders:findOne');
        });
        context.sidebar.on('click:order:product:remove', function(product) {
            context.events.once('orders:foundOne', function(order) {
                var index = order.products.indexOf(product);

                order.products.splice(index, 1);

                context.sidebar.showOrder(order);
                context.events.emit('orders:update', order);
            }).emit('orders:findOne');
        });
        
        context.sidebar.on('click:product:add', function(product) {
            context.events.once('orders:foundOne', function(order) {
                if (order.products.indexOf(product) !== -1) return;
                
                order.products.push(product);
                
                context.events.emit('orders:update', order);
            }).emit('orders:findOne');
        });
        
        context.content.on('click:products:product', function(product) {
            context.events.once('products:foundOne', function(product) {
                context.content.selectProduct(product);
                context.sidebar.showProduct(product);
            }).emit('products:foundOne', product);
        });
    });

};

function createContent(context) {
    var element = context.element.querySelector('#content');

    return new Content(element);
}

function createSidebar(context) {
    var element = context.element.querySelector('#sidebar');

    return new Sidebar(element);
}

function createLayout(context) {
    var element = context.element.querySelector('#store');
        
    var layout = new Layout(element);

    if (!element) {
        while (context.element.lastElementChild) {
            context.element.lastElementChild.remove();
        }
        context.element.appendChild(layout.element);
    
        layout.empty();
        layout.append(context.content);
        layout.append(context.sidebar);
    }

    return layout;
}
