/**
 *  Ruta: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [check('password', 'La contraseña es obligatoria').not().isEmpty(),
check('email', 'El correo es obligatorio').isEmail(), validateFields], login);

module.exports = router;