var domify = require('domify');

var template = require('views/store/sidebar/help/info.html');

function HelpInfoView(model, element) {
    this.element = element || domify(template);
}

module.exports = HelpInfoView;
