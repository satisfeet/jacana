var domify = require('domify');

var template = require('../../../../../usr/views/store/layout.html');

function Layout(element) {
    this.element = element || domify(template);
}

Layout.prototype.isNew = function() {
    var content = this.element.querySelector('#content');
    var sidebar = this.element.querySelector('#sidebar');

    return !!content && !!sidebar;
};

Layout.prototype.empty = function() {
    var element = this.element.querySelector('.row');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    return this;
};

Layout.prototype.append = function(view) {
    var element = this.element.querySelector('.row');

    element.appendChild(view.element);

    return this;
};

module.exports = Layout;
