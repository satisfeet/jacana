module.exports = function(app) {

    var mockup = {
        product: {
            name: "socks",
            description: "bla bla bla"
        }
    };

    require('./search')(app, mockup);
    require('./create')(app, mockup);
    require('./display')(app, mockup);
    require('./update')(app, mockup);
    require('./remove')(app, mockup);

};
