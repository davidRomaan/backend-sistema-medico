/**
 *  Ruta: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, reNewToken } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');
const { validateToken } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [check('password', 'La contraseña es obligatoria').not().isEmpty(),
check('email', 'El correo es obligatorio').isEmail(), validateFields], login);

router.post('/google', [check('token', 'El token de google es obligatorio').not().isEmpty(),
validateFields], googleSignIn);

router.get('/renew', validateToken, reNewToken);

module.exports = router;