module.exports = function(app, mockup) {

    require('./search')(app, mockup);

    require('./create')(app, mockup);
    
    require('./display')(app, mockup);

    require('./destroy')(app, mockup);

};
