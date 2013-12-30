var LayoutView  = require('./layout'); 
var ContentView = require('./content');
var SidebarView = require('./sidebar');

module.exports = function(app) {
      
    app('/store', function(context, next) {
        context.contentView = createContentView(context);
        context.sidebarView = createSidebarView(context);
        context.layoutView = createLayoutView(context);
        
        context.events.on('products:found', function(products) {
            context.contentView.listProducts(products);
        }).emit('products:find');
        
        context.sidebarView.on('click:order', function() {
            context.events.once('orders:foundOne', function(order) {
                if (order) return context.sidebarView.showOrder(order);

                context.events.once('orders:created', function(order) {
                    context.sidebarView.showOrder(order);
                }).emit('orders:create');
            }).emit('orders:findOne');
        });
        context.sidebarView.on('click:order:product:remove', function(product) {
            context.events.once('orders:foundOne', function(order) {
                var index = order.products.indexOf(product);

                order.products.splice(index, 1);

                context.sidebarView.showOrder(order);
                context.events.emit('orders:update', order);
            }).emit('orders:findOne');
        });
        
        context.sidebarView.on('click:product:add', function(product) {
            context.events.once('orders:foundOne', function(order) {
                if (order.products.indexOf(product) !== -1) return;
                
                order.products.push(product);
                
                context.events.emit('orders:update', order);
            }).emit('orders:findOne');
        });
        
        context.contentView.on('click:products:product', function(product) {
            context.events.once('products:foundOne', function(product) {
                context.contentView.selectProduct(product);
                context.sidebarView.showProduct(product);
            }).emit('products:foundOne', product);
        });
    });

};

function createContentView(context) {
    var element = context.element.querySelector('#content');

    return new ContentView(element);
}

function createSidebarView(context) {
    var element = context.element.querySelector('#sidebar');

    return new SidebarView(element);
}

function createLayoutView(context) {
    var element = context.element.querySelector('#store');
        
    var layoutView = new LayoutView(element);

    if (!element) {
        while (context.element.lastElementChild) {
            context.element.lastElementChild.remove();
        }
        context.element.appendChild(layoutView.element);
    
        layoutView.empty();
        layoutView.append(context.contentView);
        layoutView.append(context.sidebarView);
    }

    return layoutView;
}
