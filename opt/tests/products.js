var chai      = require('chai');
var supertest = require('supertest');

var app = require('../../lib');

describe('GET /products', function() {

	it('should respond json', function(done) {
		supertest(app).get('/products').accept('json')
			.expect('Content-Type', /json/)
			.expect(200, [], done);
	});

	it('should respond html', function(done) {
		supertest(app).get('/products').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});
