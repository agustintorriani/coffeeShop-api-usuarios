/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var usuarios = require('./api/usuario.route')

router.use('/usuarios', usuarios);

module.exports = router;
