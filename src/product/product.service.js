var Product = require('./product.model');

exports.find = (callback) => {
  Product.find().populate('members').populate('sprints').exec((err, products) => {
    if (err) {
      return callback(null, err);
    }
    return callback(products, null);
  });
};

exports.get = (id, callback) => {
  Product.findById(id, (err, product) => {
    if (err) {
      return callback(null, err);
    }
    if (!product) {
      return callback(null, {message: 'Not found'});
    }
    return callback(product, null);
  });
};

exports.post = (data, callback) => {
  Product.create(data, (err, product) => {
      if (err) {
        return callback(null, err);
      }
      return callback(product, err);
    });
};

exports.put = (id, data, callback) => {
  Product.findById(id, (err, product) => {
    if (err) {
      return callback(null, err);
    }
    if (!product) {
      return callback(null, {});
    }

    product.name = data.name;
    product.members = data.members;
    product.sprints = data.sprints;

    product.save((err) => {
      if (err) {
        return callback(null, err);
      }
      return callback(null, product);
    });
  });
};