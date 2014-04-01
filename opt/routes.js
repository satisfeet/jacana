var supertest = require('supertest');

var app = require('../lib');

describe('GET /', function() {

	it('should respond html', function(done) {
		supertest(app).get('/').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});

describe('GET /about', function() {

	it('should respond html', function(done) {
		supertest(app).get('/about').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});

describe('GET /legal', function() {

	it('should respond html', function(done) {
		supertest(app).get('/legal').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});

describe('GET /order', function() {

	it('should respond html', function(done) {
		supertest(app).get('/order').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});

describe('POST /orders', function() {

	it('should respond json', function(done) {
		this.timeout(5000);

		supertest(app).post('/orders').accept('json')
			.send(app.orders[0])
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

});

describe('GET /products', function() {

	it('should respond json', function(done) {
		supertest(app).get('/products').accept('json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('should respond html', function(done) {
		supertest(app).get('/products').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});
