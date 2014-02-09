var path     = require('path');
var lodash   = require('lodash');
var express  = require('express');
var packpath = require('packpath');

module.exports = function(app) {

  app.use(express.json());
  app.use(express.logger());
  app.use(express.compress());

  app.configure(function() {
    var settings = lodash.cloneDeep(require('../../etc/general'));

    lodash.merge(app.settings, settings);
  });

  app.configure('production', function() {
    var settings = lodash.cloneDeep(require('../../etc/production'));

    lodash.merge(app.settings, settings);
  });

  app.configure('development', function() {
    var settings = lodash.cloneDeep(require('../../etc/development'));

    lodash.merge(app.settings, settings);
  });

  app.configure(function() {
    lodash.forIn(app.settings, function resolve(value, index, source) {
      if (lodash.isArray(value)) {
        return lodash.forEach(value, resolve);
      }
      if (lodash.isPlainObject(value)) {
        return lodash.forIn(value, resolve);
      }
      if (lodash.isString(value) && !value.indexOf('/')) {
        source[index] = path.join(packpath.self(), value);
      }
    });
  });

};
