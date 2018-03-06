const config = require('./config.js');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    var token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {      
            if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
            req.decoded = decoded;    
            next();
            }
        });
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}

exports.createToken = (data) => {
    var token = jwt.sign(data, config.secret, {
        expiresIn : 60*60*24 
    });
    return token;
}