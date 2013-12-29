var nodemailer = require('nodemailer');

module.exports = function(app) {

    app.mailer = createMailer(app);

};

function createMailer(app) {
    var options = {};

    options.service = app.settings.mailer.service;
    options.auth = app.settings.mailer.account;

    return nodemailer.createTransport('SMTP', options);
}
