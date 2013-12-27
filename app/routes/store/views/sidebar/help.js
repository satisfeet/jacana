var domify = require('domify');

var template = require('../../../../../usr/views/store/sidebar/help.html');

function HelpView(model, element) {
    this.element = element || domify(template);
}

module.exports = HelpView;
