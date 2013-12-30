module.exports = function(app) {

    var mockup = {
        product: {
            name: "socks",
            image: {
                path: '/images/products/new.jpg'
            },
            description: "bla bla bla",
            variations: {
                colors: ['blue', 'red'],
                sizes: ['38-40', '40-42']
            }
        }
    };

    require('./search')(app, mockup);
 
    require('./create')(app, mockup);
 
    require('./display')(app, mockup);
 
    require('./update')(app, mockup);
 
    require('./remove')(app, mockup);

};
