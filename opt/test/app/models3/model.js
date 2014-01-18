var chai   = require('chai');
var events = require('events');

module.exports = function(app) {

    var Model = app.Model;

    describe('Model', function() {

        describe('new Model([source])', function() {

            it('should set unique id', function() {
                var model1 = new Model();
                var model2 = new Model();

                chai.expect(model1).to.have.property('id');
                chai.expect(model2).to.have.property('id');
                chai.expect(model1.id).to.not.eql(model2.id);
            });
            
            it('should set attributes to object', function() {
                var model = new Model();

                chai.expect(model.attributes).to.be.empty;
                chai.expect(model.attributes).to.be.an('object');
            });

            it('should set attributes to source', function() {
                var model = new Model({ foo: 'bar' });

                chai.expect(model.attributes).to.be.not.empty;
                chai.expect(model.attributes).to.be.an('object');
                chai.expect(model.attributes).to.have.property('foo', 'bar');
            });

            it('should be instance of EventEmitter', function() {
                var model = new Model();

                chai.expect(model).to.be.an.instanceOf(events.EventEmitter);
            });

        });

        describe('#has(key)', function() {

            it('should return false', function() {
                var model = new Model();

                chai.expect(model.has('foo')).to.be.a('boolean');
                chai.expect(model.has('foo')).to.be.false;
            });

            it('should return true', function() {
                var model = new Model({ foo: 'bar' });

                chai.expect(model.has('foo')).to.be.a('boolean');
                chai.expect(model.has('foo')).to.be.true;
            });

        });

        describe('#get(key)', function() {

            it('should return undefined', function() {
                var model = new Model();
    
                chai.expect(model.get('foo')).to.be.undefined;
            });

            it('should return attribute property key', function() {
                var model = new Model({ foo: 'bar' });
    
                chai.expect(model.get('foo')).to.equal('bar');
            });

        });

        describe('#set([key, source][, value])', function() {

            it('should return this', function() {
                var model = new Model();

                chai.expect(model.set('foo', 'bar')).to.equal(model);
            });

            it('should set attribute property key to value', function() {
                var model = new Model().set('foo', 'bar');

                chai.expect(model.attributes).to.have.property('foo', 'bar');
            });

            it('should set attribute to properties in object', function() {
                var model = new Model().set({ foo: 'bar' });

                chai.expect(model.attributes).to.have.property('foo', 'bar');
            });

            it('should emit "change:<attribute>" event', function(done) {
                var model = new Model();
                
                model.once('change:foo', function(value) {
                    chai.expect(value).to.equal('bar');

                    done();       
                });
                model.set({ foo: 'bar' });
            });

            it('should emit "change" event', function(done) {
                var model = new Model();
                
                model.once('change', function(key, value) {
                    chai.expect(key).to.equal('foo');
                    chai.expect(value).to.equal('bar');

                    done();       
                });
                model.set({ foo: 'bar' });
            });

        });

        describe('#toJSON()', function() {

            it('should return cloned attributes', function() {
                var model = new Model({
                    baz: { foo: 'bar' }   
                });

                chai.expect(model.toJSON()).to.eql(model.attributes);
                chai.expect(model.toJSON()).to.not.equal(model.attributes);
            });

        });

    });

};
