module.exports = function(app, schema) {

    schema.method('serialize', function() {
        var serialized = this.toJSON();

        serialized._id = serialized._id.toString();

        return serialized;
    });

};
