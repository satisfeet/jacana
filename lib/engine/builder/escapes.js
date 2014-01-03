exports.parse = function (str, line, parser, types, stack, options) {
    parser.on(types.VAR, function(token) {
        console.log(token, token.match);
    });
    parser.on(types.STRING, function(token) {
        throw new Error('Unexpected string token "' + token.match + '" in raw tag on line ' + line + '.');
    });

    return true;
};

exports.compile = function(compiler, args, content, parents, options, blockName) {
    return compiler(content, parents, options, blockName);
};
