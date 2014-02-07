exports.notFoundError = function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('errors/index', {
      title: 'Seite nicht gefunden',
      message: 'Die von Ihnen angeforderte Seite wurde leider nicht gefunden.'
    });

    return;
  }
  if (req.accepts('json')) {
    res.send({
      error: 'Not Found Error'
    });

    return;
  }

  res.send('Not Found Error');
};
