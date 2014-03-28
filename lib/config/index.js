var path    = require('path');
var lodash  = require('lodash');
var express = require('express');

module.exports = function(app) {

  app.configure(function() {
    app.use(express.json());

    lodash.merge(app.settings, require('../../config/general'));
  });

  app.configure('production', function() {
    app.use(express.logger());
    app.use(express.compress());

    lodash.merge(app.settings, require('../../config/production'));
  });

  app.configure('development', function() {
    lodash.merge(app.settings, require('../../config/development'));
  });

  lodash.forIn(app.settings, function resolve(value, index, source) {
    if (lodash.isString(value) && !value.indexOf('/')) {
      source[index] = path.join(__dirname + '/../../', value);
    }
    if (lodash.isArray(value)) {
      lodash.forEach(value, resolve);
    }
    if (lodash.isPlainObject(value)) {
      lodash.forIn(value, resolve);
    }
  });

};
