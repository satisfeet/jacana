var chai   = require('chai');
var events = require('events');

module.exports = function(app) {

    var Model = require('../../../../../app/models3/core/model');
    var Collection = require('../../../../../app/models3/core/collection');

    describe('Collection', function() {

        describe('new Collection([source])', function() {

            it('should set models to array', function() {
                var collection = new Collection();

                chai.expect(collection.models).to.be.empty;
                chai.expect(collection.models).to.be.an('array');
            });

            it('should set models to source', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }
                ]);

                chai.expect(collection.models).to.be.not.empty;
                chai.expect(collection.models).to.be.an('array');
                chai.expect(collection.models).to.have.length(1);
                chai.expect(collection.models[0])
                    .to.be.an.instanceOf(Model);
            });
            
            it('should be instance of EventEmitter', function() {
                var collection = new Collection();

                chai.expect(collection)
                    .to.be.an.instanceOf(events.EventEmitter);
            });

        });

        describe('#at(index)', function() {

            it('should return undefined', function() {
                var collection = new Collection();

                chai.expect(collection.at(0)).to.be.undefined;
            });

            it('should return model', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }
                ]);

                chai.expect(collection.at(0))
                    .to.equal(collection.models[0]);
            });

        });

        describe('#has(uniqueId)', function() {

            it('should return false', function() {
                var collection = new Collection();

                chai.expect(collection.has(3)).to.be.false;
            });

            it('should return true', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }
                ]);
                var uniqueId = collection.at(0).id;

                chai.expect(collection.has(uniqueId)).to.be.true;
            });

        });

        describe('#get(uniqueId)', function() {
            
            it('should return undefined', function() {
                var collection = new Collection();

                chai.expect(collection.get('3')).to.be.undefined;
            });

            it('should return model', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }
                ]);
                var model = collection.at(0);

                chai.expect(collection.get(model.id)).to.equal(model);
            });

        });

        describe('#push(model)', function() {

            it('should return collection', function() {
                var model = new Model();
                var collection = new Collection();

                chai.expect(collection.push(model)).to.equal(collection);
            });

            it('should push model to models', function() {
                var model = new Model({ foo: 'bar' });
                var collection = new Collection();

                chai.expect(collection.push(model).at(0)).to.equal(model);
            });

            it('should emit "push" event', function(done) {
                var model = new Model();
                var collection = new Collection();

                collection.once('push', function(model) {
                    chai.expect(model).to.equal(model);

                    done();
                });
                collection.push(model);
            });

        });

        describe('#remove(model)', function() {
            
            it('should return collection', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }    
                ]);
                var model = collection.at(0);

                chai.expect(collection.remove(model)).to.equal(collection);
            });

            it('should remove model from models', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }    
                ]);
                var model = collection.at(0);

                chai.expect(collection.remove(model).models).to.be.empty;
            });

            it('should emit "remove" event', function(done) {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }    
                ]);
                var model = collection.at(0);

                collection.once('remove', function(amodel) {
                    chai.expect(model).to.equal(amodel);

                    done();
                });
                collection.remove(model);
            });

        });

        describe('#forEach(callback)', function() {

            it('should exec callback on every model', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }
                ]);

                collection.forEach(function(model, index) {
                    chai.expect(collection.at(index)).to.equal(model);
                });
            });

        });

        describe('#toJSON()', function() {

            it('should return serialized array', function() {
                var collection = new Collection([
                    { baz: { foo: 'bar' } }
                ]);

                chai.expect(collection.toJSON())
                    .to.eql([{ baz: { foo: 'bar' }}]);
            });

        });

    });

};
