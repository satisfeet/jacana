var domify = require('domify');

var template = require('views/store/layout.html');

function Layout(element) {
    this.element = element || domify(template);
}

Layout.prototype.empty = function() {
    var element = this.element.querySelector('.row');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }
};

Layout.prototype.append = function(view) {
    var element = this.element.querySelector('.row');

    element.appendChild(view.element);
};

module.exports = Layout;
