var Layout  = require('./layout'); 
var Content = require('./content');
var Sidebar = require('./sidebar');

module.exports = function(app, context) {
    var element = context.element;
    
    context.layout = new Layout(context.query('#store'));
    context.content = new Content(context.query('#content'));
    context.sidebar = new Sidebar(context.query('#sidebar'));
    
    if (!context.query('#store')) {
        while (element.lastElementChild) {
            element.lastElementChild.remove();
        }
        element.appendChild(context.layout.element);
    
        context.layout.empty();
        context.layout.append(context.content);
        context.layout.append(context.sidebar);
    }
};
