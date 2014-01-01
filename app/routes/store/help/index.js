var domify = require('domify');

var template = require('views/store/help/index.html');

function HelpInfo(model, element) {
    this.element = element || domify(template);
}

module.exports = HelpInfo;
