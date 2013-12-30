var domify = require('domify');

var template = require('views/store/layout.html');

function LayoutView(element) {
    this.element = element || domify(template);
}

LayoutView.prototype.empty = function() {
    var element = this.element.querySelector('.row');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }
};

LayoutView.prototype.append = function(view) {
    var element = this.element.querySelector('.row');

    element.appendChild(view.element);
};

module.exports = LayoutView;
