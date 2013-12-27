var fs   = require('fs');
var path = require('path');
var less = require('less');

function readFile(file, callback) {
    var path = createReadPath(file);

    fs.readFile(path, function(err, buf) {
        if (err) return callback(err);

        callback(null, buf.toString());
    });   
};

function writeFile(file, style, callback) {
    var path = createWritePath(file);

    fs.writeFile(path, style, function(err) {
        if (err) return callback(err);

        callback(null);
    });
};

function compileFile(file, callback) {
    readFile(file, function(err, src) {
        if (err) return callback(err);

        createParser().parse(src, function(err, tree) {
            if (err) return callback(err);

            writeFile(file, tree.toCSS(), callback);
        });
    });    
}

exports.read = readFile;
exports.write = writeFile;
exports.compile = compileFile;

function createParser() {
    var options = {
        paths: [
            path.join(__dirname, '/../../../usr/styles/bootstrap-theme')
        ]   
    };

    return new less.Parser(options);
}

function createReadPath(file) {
    var prePath = path.join(__dirname, '/../../../');
    
    return path.join(prePath, file.input);
}

function createWritePath(file) {
    var prePath = path.join(__dirname, '/../../../');

    return path.join(prePath, file.output);
}
