/**
 *  Ruta: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [check('password', 'La contraseña es obligatoria').not().isEmpty(),
check('email', 'El correo es obligatorio').isEmail(), validateFields], login);

router.post('/google', [check('token', 'El token de google es obligatorio').not().isEmpty(),
validateFields], googleSignIn);

module.exports = router;