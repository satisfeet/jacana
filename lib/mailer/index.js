var nodemailer = require('nodemailer');

module.exports = function(app) {

  app.mailer = createMailer(app.settings.mailer);

};

function createMailer(options) {
  return nodemailer.createTransport('SMTP', options);
}
