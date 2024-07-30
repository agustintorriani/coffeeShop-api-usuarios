var express = require('express')
var router = express.Router()
var UsuarioController = require('../../controllers/usuarios.controller');
var Authorization = require('../../auth/authorization');


router.get('/ping', function(req, res, next) {
  res.send('Llegaste a la ruta de api/usuarios');
});

router.get('/status', function(req, res, next) {
  res.send('success');
});

router.post('/registrar', UsuarioController.crear)
router.post('/ingresar', UsuarioController.ingresar)
router.post('/obtenerPerfil', Authorization ,UsuarioController.obtenerPerfil)


module.exports = router;