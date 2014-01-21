var events = require('events');

module.exports = function(app) {

  app('*', function(context, next) {
    context.events = createEmitter();
    context.events.on('error', function(err) {
      console.log(err);
    });

    next();
  });

};

function createEmitter() {
  return new events.EventEmitter();
}
