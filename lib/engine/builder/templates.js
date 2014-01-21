var swig    = require('swig');
var clone   = require('clone');
var through = require('through');

var regex = /\.[0-9a-z]+$/i;

module.exports = function(app) {
    // we need a second swig instance to overwrite var controls so that
    // swig does not replace our var placeholders with empty spaces while
    // preparing templates for our client build 
    var compiler = new swig.Swig({
        varControls: ['<%=', '%>']
    });

    return function(filename) {
        var template = '';

        // skip if filename does not assume html file
        if (!isHTMLFile(filename)) {
            return through();
        }

        function read(string) {
            template += string;
        }
        function end() {
            var module = 'module.exports =';

            try {
                template = compiler.render(template, {
                    filename: filename
                });
            } catch(e) {
                this.emit('error', e);
            }

            module += JSON.stringify(template);

            this.queue(module);
            this.queue(null);
        }

        return through(read, end);
    };
};

function isHTMLFile(filename) {
    var extension = regex.exec(filename).pop();

    return extension === '.html';
}
