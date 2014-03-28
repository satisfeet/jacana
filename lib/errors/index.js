var express = require('express');

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.status(404);
    res.format({
      json: function() {
        res.json(404, { error: 'Not found' });
      },
      html: function() {
        res.render('errors/index', {
          title: 'Seite nicht gefunden',
          message: 'Die angeforderte Seite wurde leider nicht gefunden.'
        });
      }
    });
  });

  app.use(function(err, req, res, next) {
    if (!req.accepts('html')) return next(err);

    res.status(500);
    res.render('errors/index', {
      title: 'Server Fehler',
      message: 'Tut uns leid, bei uns gerade ist ein Server Fehler passiert.'
        + 'Bitte kontaktieren Sie uns per Email, damit wird dieses Problem '
        + 'schnellstmöglich beheben können. Vielen Dank.'
    });
  });

  app.use(express.errorHandler());

};
