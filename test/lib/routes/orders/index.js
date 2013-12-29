module.exports = function(app) {

    var mockup = {
        order: {
            customer: {
                name: 'Bodo Kaiser',
                email: 'info@example.org'
            },
            products: [
                {
                    name: 'Premium',
                    size: '42-44',
                    amount: 5
                }
            ]
        }
    };

    require('./search')(app, mockup);

    require('./create')(app, mockup);
    
    require('./display')(app, mockup);

};