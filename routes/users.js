/**
 *  Ruta: /api/users
 */
const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateToken, validateAdminRole, validateAdminRoleAndSameProfile } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateToken ,getUsers);

//antes de entrar al createUser se validan los campos con check luego si un campo esta vacio entonces se ejecuta el middleware validateFields
//el cual va a retornar el error 
router.post('/', [check('name','El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),validateFields], createUser);


router.put('/:id', [validateToken,validateAdminRoleAndSameProfile,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatoria').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),validateFields
], updateUser);

router.delete('/:id', [validateToken, validateAdminRoleAndSameProfile],deleteUser);

module.exports = router;