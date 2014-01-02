module.exports = function(app, schema) {

    schema.method('notify', function(callback) {
        var options = {};

        options.to = this.customer.email;
        options.from = app.settings.mailer.account.username;
        options.subject = 'Shopping Notification';
        options.html = '<p>Does this work</p>';

        app.mailer.sendMail(options, function(err, res) {
            if (err) return callback(err);

            callback(null, res.message);
        });
    });

};
