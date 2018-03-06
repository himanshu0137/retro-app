const bcrypt = require("bcryptjs");
const User = require("./user.model");
const AuthService = require("../auth.service");

exports.find = callback => {
  User.find((err, users) => {
    if (err) {
      return callback(null, err);
    }
    return callback(users, null);
  });
};

exports.get = (id, callback) => {
  User.findById(id, (err, user) => {
    if (err) {
      return callback(null, err);
    }
    if (!user) {
      return callback(null, { message: "Not found" });
    }
    return callback(user, null);
  });
};

exports.login = (data, callback) => {
  User.findOne({ email: data.email }, (err, user) => {
    if (err) {
      return callback(null, err);
    }

    if (user) {
      bcrypt.compare(data.password, user.password, (err, passwordMatched) => {
        if (passwordMatched) {
          let token = AuthService.createToken({ id: user._id });
          return callback(token, null);
        } else {
          return callback(null, { message: "Incorrect credentials" });
        }
      });
    }

    if (!user) {
      return callback(null, { message: "Incorrect credentials" });
    }
  });
};

exports.login = (data, callback) => {
  User.findOne({ email: data.email }, (err, user) => {
    if (err) {
      return callback(null, err);
    }

    if (user) {
      bcrypt.compare(data.password, user.password, (err, passwordMatched) => {
        if (passwordMatched) {
          let token = AuthService.createToken({ id: user._id });
          return callback(token, null);
        } else {
          return callback(null, { message: "Incorrect credentials" });
        }
      });
    }

    if (!user) {
      return callback(null, { message: "Incorrect credentials" });
    }
  });
};

exports.post = (data, callback) => {
  User.findOne({ email: data.email }, (err, user) => {
    if (err) {
      return callback(err);
    }

    if (user) {
      return callback("User already exists");
    }

    if (!user) {
      bcrypt.hash(data.password, 8, (err, hash) => {
        data.password = hash;
        User.create(data, err => {
          if (err) {
            return callback(err);
          }
          return callback(null);
        });
      });
    }
  });
};
