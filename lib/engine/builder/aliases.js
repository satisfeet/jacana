var path     = require('path');
var clone    = require('clone');
var through  = require('through');
var aliasify = require('aliasify');

module.exports = function(app) {

  var options = app.settings.engine.builder;

  return aliasify.configure(options);

};
