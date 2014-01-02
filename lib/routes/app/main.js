module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('app/index/index', function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });

};
