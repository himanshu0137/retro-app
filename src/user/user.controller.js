const User = require('./user.model');
const UserService = require('./user.service');

exports.find = (req, res, next) => {
    UserService.find((users, err) => {
      if(err) {
        next(err);
      }
      else {
        res.status(200).json(users);
      }
    });
};

exports.get = (req, res, next) => {
  UserService.find(req.params.id, (user, err) => {
    if(err) {
      next(err);
    }
    else {
      res.status(200).json(user);
    }
  });
};

exports.register = (req, res, next) => {
  req.check('firstname', 'Firstname is required').notEmpty();
  req.check('lastname', 'Lastname is required').notEmpty();
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email is not valid').isEmail();
  req.check('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();

  if(errors) {
    res.status(400).json({errors: errors});
    return;
  }

  var newUser = new User(req.body);
  UserService.post(newUser, (err) => {
    if(err) {
      next(err);
    }
    else {
      res.status(200).json();
    }
  })
};

exports.login = function(req, res, next) {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email is not valid').isEmail();
  req.check('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();

  if(errors) {
    res.status(400).json({errors: errors});
    return;
  }
  
  UserService.login(req.body, (token, err) => {
    if(err) {
      next(err);
    }
    else {
      res.status(200).json(token);
    }
  })
}
