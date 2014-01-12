var element = document.querySelector('#content');

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
