module.exports = function(app, exec, mockup) {
    
    describe('search', function() {

        require('./orders')(app, exec, mockup);

        require('./products')(app, exec, mockup);

    });

};
