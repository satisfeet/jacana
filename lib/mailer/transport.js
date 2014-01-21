var nodemailer = require('nodemailer');

module.exports = function(app) {

  var mailer = createMailer(app.settings.mailer);

  app.use(function(req, res, next) {
    res.mailer = mailer;

    next();
  });

};

function createMailer(options) {
  return nodemailer.createTransport('SMTP', options);
}
