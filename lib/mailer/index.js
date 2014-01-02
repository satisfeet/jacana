var path       = require('path');
var swig       = require('swig');
var nodemailer = require('nodemailer');

module.exports = function(app) {

    var mailer = createMailer(app);

    app.sendMail = function(file, options, callback) {
        var filepath = path.join(__dirname, '/../../usr/views/mail/', file);

        swig.renderFile(filepath, options.context, function(err, source) {
            if (err) return callback(err);

            mailer.sendMail({
                to: options.receiver,
                from: app.settings.mailer.account.username,
                subject: options.subject,
                html: source
            }, callback);
        });
    };

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
