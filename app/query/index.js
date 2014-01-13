module.exports = function(app) {
    
    var element = document.querySelector('#content');

    app('*', function(context, next) {
        context.element = element;

        next();
    });

};
