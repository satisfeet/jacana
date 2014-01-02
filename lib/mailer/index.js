var nodemailer = require('nodemailer');

module.exports = function(app) {

    app.mailer = createMailer(app);

};

function createMailer(app) {
    var options = {
        service: app.settings.mailer.service,
        auth: {
            user: app.settings.mailer.account.username,
            pass: app.settings.mailer.account.password
        }
    };

    return nodemailer.createTransport('SMTP', options);
}
