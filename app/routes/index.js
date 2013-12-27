module.exports = function(app) {

    require('./main')(app);

    require('./about')(app);

    require('./legal')(app);

    require('./store')(app);

};
