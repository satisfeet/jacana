module.exports = function(app) {

    var mockup = {
        order: {
            customer: {
                name: 'Bodo Kaiser',
                email: 'kyogron@googlemail.com',
                address: {
                    street: 'Geiserichstraße 3',
                    zipcode: 12105
                }
            },
            products: [
                {
                    name: 'Premium',
                    variations: {
                        size: '42-44',
                        color: 'olive-gray'
                    },
                    quantity: 5
                }
            ]
        }
    };

    require('./search')(app, mockup);

    require('./create')(app, mockup);
    
    require('./display')(app, mockup);

};
