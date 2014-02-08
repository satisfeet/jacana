exports.internalError = function(err, req, res, next) {
  console.error(err.stack || err.toString());

  res.status(500);

  if (req.accepts('html')) {
    res.render('errors/index', {
      title: 'Server Fehler',
      message: 'Tut uns leid, bei uns gerade ist ein Server Fehler passiert.'
        + 'Bitte kontaktieren Sie uns per Email, damit wird dieses Problem '
        + 'schnellstmöglich beheben können. Vielen Dank.'
    });

    return;
  }
  if (req.accepts('json')) {
    res.send({
      error: err
    });

    return;
  }

  res.send('Internal Server Error');
};
