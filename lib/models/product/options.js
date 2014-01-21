module.exports = function(schema) {

  schema.set('toJSON', {
    transform: transform
  });

};

function transform(model, object) {
  object._id = object._id.toString();

  return object;
}
