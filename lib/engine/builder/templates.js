var swig    = require('swig');
var clone   = require('clone');
var through = require('through');

var regex = /\.[0-9a-z]+$/i;

module.exports = function(app) {
    return function(filename) {
        var template = '';

        if (!isHTMLFile(filename)) {
            return through();
        }

        var stream = through(read, end);

        function read(string) {
            template += string;
        }
        function end() {
            var module = 'module.exports =';

            try {
                template = app.swig.render(template, {
                    filename: filename   
                });
            } catch (e) {
                stream.emit('error', e);
            }

            module += JSON.stringify(template);

            this.queue(module);
            this.queue(null);
        }

        return stream;
    };
};

function isHTMLFile(filename) {
    var extension = regex.exec(filename).pop();

    return extension === '.html';
}
