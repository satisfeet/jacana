module.exports = function(app) {
    
    app.get('/legal', function(req, res, next) {
        res.render('legal/index', function(err, html) {
            if (err) return next(err);

            res.send(html);
        });
    });

};
