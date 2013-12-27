var template = require('../../../usr/views/legal/layout.html');

module.exports = function(app) {

    app('/legal', function(context, next) {
        var element = context.element;

        if (!context.query('#legal')) {
            element.innerHTML = template;
        }
    });

};
