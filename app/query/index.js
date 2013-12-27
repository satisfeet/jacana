var element = document.querySelector('main');

module.exports = function(app) {

    app('*', function(context, next) {
        context.query = query;
        context.element = element;

        next();
    });

    function query(selector) {
        return element.querySelector(selector);
    }

};
