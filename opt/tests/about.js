var supertest = require('supertest');

var app = require('../../lib');

describe('GET /about', function() {

	it('should respond html', function(done) {
		supertest(app).get('/about').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});
