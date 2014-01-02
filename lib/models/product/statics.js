module.exports = function(app, schema) {

    schema.static('findAll', function(callback) {
        return this.find().exec(callback);
    });

    schema.static('findOneById', function(id, callback) {
        return this.findOne({ _id: id }).exec(callback);
    });

    schema.static('findOneByIdAndUpdate', function(id, callback) {
        return this.findOneById(id, function(err, doc) {
            if (err) return callback(err);


        });
    });

    schema.static('findOneByIdAndRemove', function(id, callback) {
        return this.findOneById(id, function(err, doc) {
            if (err) return callback(err);


        });
    });

};
