module.exports = function(app) {
    
    app.get('/about', function(req, res, next) {
        res.render('about/index', function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });

};
