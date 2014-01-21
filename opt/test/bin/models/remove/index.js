module.exports = function(app, exec, mockup) {

    describe('remove', function() {

        require('./order')(app, exec, mockup);

        require('./product')(app, exec, mockup);

    });

};
