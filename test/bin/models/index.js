var child_process = require('child_process');

describe('bin/models', function() {

    var app = require('../../');

    var mockup = {
        orders: require('../../../opt/models/orders'),
        products: require('../../../opt/models/products')
    };
    
    require('./create')(app, exec, mockup);

    require('./search')(app, exec, mockup);
    
    require('./remove')(app, exec, mockup);

});

function exec(command, callback) {
    return child_process.exec(command, {
        cwd: __dirname + '/../../../'
    }, callback);
}
