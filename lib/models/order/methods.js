module.exports = function(app, schema) {

    schema.method('notify', function(callback) {
        var options = {
            receiver: this.customer.email,
            subject: 'Bestellbestätigung',
            context: this.toJSON()
        };

        app.sendMail('notify.html', options, function(err, res) {
            if (err) return callback(err);

            callback(null);
        });
    });

};
