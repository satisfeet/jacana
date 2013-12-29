module.exports = function(app) {

    require('./app')(app);

    require('./products')(app);

};
