/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
var jwt = require('jsonwebtoken');
// var config = require('../../config').config();

var authorization = function (req, res, next) {
    var token = req.headers['authorization'];
    var msg = {auth: false, message: 'No se recibió ningún token.'};
    
    if (!token){
        res.status(500).send(msg);
    } else {
        token = token.slice(7); // Remove 'Bearer ' from the token string
        let sec = process.env.SECRET;
        jwt.verify(token, sec, function (err, decoded) {
        var msg = {auth: false, message: 'El token no es válido.'};
        
        if(err)
        res.status(500).send(msg);
        
        // req.userId = decoded.id;
        next();
    });
    }
}

module.exports = authorization;

