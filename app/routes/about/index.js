var template = require('../../../usr/views/about/layout.html');

module.exports = function(app) {

    app('/about', function(context, next) {
        var element = context.element;
        
        if (!context.query('#about')) {
            element.innerHTML = template;
        }
    });

};
