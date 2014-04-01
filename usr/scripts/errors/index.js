var template = require('../views/errors');

module.exports = function(app) {

  app('*', function(context) {
    context.element.innerHTML = template({
      title: 'Seite nicht gefunden',
      message: 'Die von Ihnen angeforderte Seite wurde leider nicht gefunden.'
    });
  });

};
