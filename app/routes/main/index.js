var template = require('../../../usr/views/index/layout.html');

module.exports = function(app) {

    app('/', function(context, next) {
        var element = context.element;

        if (!context.query('#main')) {
            element.innerHTML = template;
        }
    });

};
