module.exports = function(schema) {

  schema.static('countYear', function(year, callback) {
    var start = new Date(year, 0, 1);
    var end = new Date(year + 1, 0, 1);

    return this.count({ createdAt: { $gte: start, $lt: end } }, callback);
  });

};
