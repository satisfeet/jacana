module.exports = function(app, exec, mockup) {
    
    describe('remove', function() {

        require('./orders')(app, exec, mockup);

        require('./products')(app, exec, mockup);

    });

};
