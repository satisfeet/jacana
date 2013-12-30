module.exports = function(app) {

    app('*', function(context, next) {
        require('./order')(context);
        require('./product')(context);

        next();
    });

};
