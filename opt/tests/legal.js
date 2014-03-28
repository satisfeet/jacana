var supertest = require('supertest');

var app = require('../../lib');

describe('GET /legal', function() {

	it('should respond html', function(done) {
		supertest(app).get('/legal').accept('html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

});
