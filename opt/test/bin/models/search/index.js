module.exports = function(app, exec, mockup) {

  describe('search', function() {

    require('./order')(app, exec, mockup);

    require('./product')(app, exec, mockup);

  });

};
