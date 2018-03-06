const SprintService = require('./sprint.service');
const Sprint = require('./sprint.model');
const Product = require('../product/product.model');

exports.find = (req, res, next) => {
  SprintService.find((sprints, err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(sprints);
  });
};

exports.post = (req, res, next) => {
    var newSprint = new Sprint(req.body);

    SprintService.post(newSprint, req.param.id, (sprint, err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json(sprint);
    })
};