var chai      = require('chai');
var supertest = require('supertest');

var app = require('../../lib');

describe('GET /orders', function() {

	it('should respond html', function(done) {
		supertest(app).get('/order').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});

describe('POST /orders', function() {

	xit('should respond json', function(done) {
		this.timeout(5000);

		supertest(app).post('/orders').accept('json')
			.send(order)
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

});
