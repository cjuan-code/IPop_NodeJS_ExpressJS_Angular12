var jwt = require('express-jwt');
require('dotenv').config({path: 'var.env'});
var secret = process.env.SECRET;

function getTokenFromHeader(req){
  
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    algorithms: ['sha512', 'sha1', 'RS256', 'HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    algorithms: ['sha512'],
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
