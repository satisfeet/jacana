var lodash = require('lodash');

function Navbar(element) {
  this.element = element;
}

Navbar.prototype.setBrand = function(brand) {
  this.element.querySelector('.navbar-brand').innerText = brand;

  return this;
};

Navbar.prototype.setOrderBadge = function(badge) {
  if (!badge) badge = '';

  this.element.querySelector('.navbar-btn .badge').innerText = badge;

  return this;
};

module.exports = Navbar;
