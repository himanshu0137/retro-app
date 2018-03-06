const Sprint = require('./sprint.model');
const ProductService = require('../product/product.service');

exports.find = (callback) => {
    Sprint.find(function(err, sprints) {
        if (err) {
        return callback(null, err);
        }
        return callback(sprints, null)
    });
};
  
exports.post = (data, productId, callback) => {
    Sprint.create(data, function(err, sprint) {
        if (err) {
            return callback(null, err);
        }

        ProductService.get(productId, (product, err) => {
            if (err) {
                return callback(null, err);
            }
        });        

        return callback(sprint, null);
    });
};