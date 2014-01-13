module.exports = function(app, exec, mockup) {
    
    describe('create', function() {

        require('./orders')(app, exec, mockup);

        require('./products')(app, exec, mockup);

    });

};
