describe('app/models3', function() {

    var app = {
        Model: require('../../../../app/models3/model'),
        Collection: require('../../../../app/models3/collection'),
    };

    require('./model')(app);

    require('./collection')(app);

});
