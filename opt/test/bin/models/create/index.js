module.exports = function(app, exec, mockup) {

  describe('create', function() {

    require('./order')(app, exec, mockup);

    require('./product')(app, exec, mockup);

  });

};
