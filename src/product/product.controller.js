var ProductService = require('./product.service');
var Product = require('./product.model');

exports.find = (req, res, next) => {
  ProductService.find((products, err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(products);
  });
};

exports.get = (req, res, next) => {
  ProductService.get(req.params.id, (product, err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(product);
  });
};

exports.post = (req, res, next) => {
  var newProduct = new Product(req.body);
  ProductService.post(newProduct, (product, err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json(product);
    });
};

exports.put = (req, res, next) => {
  var newProduct = new Product(req.body);
  ProductService.put(req.params.id, newProduct, (err, product) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(product);
  });
};