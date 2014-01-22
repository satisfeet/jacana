module.exports = function(app) {

  app.use(function(req, res, next) {
    res.submit = function(receiver, subject, content, callback) {
      res.mailer.sendMail({
        to: receiver, subject: subject, html: content
      }, function(err) {
        if (err) throw err;
      });
    };

    next();
  });

};
