var cluster = require('cluster');

module.exports = function(app) {

  if (app.env === 'production') {
    require('./worker')(app);

    //if (cluster.isMaster) require('./master')(app);
    //if (cluster.isWorker) require('./worker')(app);
  }

  if (app.env === 'development') {
    require('./worker')(app);
  }

};
