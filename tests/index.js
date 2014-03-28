var supertest = require('supertest');

var app = require('../lib');

describe('GET /', function() {

	it('should respond html', function(done) {
		supertest(app).get('/').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});
