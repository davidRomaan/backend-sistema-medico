/**
 *  Ruta: /api/medics
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateToken } = require('../middlewares/validate-jwt');
const{getMedics, createMedic, updateMedic, deleteMedic, getMedicById} = require('../controllers/medicController')

const router = Router();

router.get('/', validateToken, getMedics);
router.get('/:id', validateToken, getMedicById);

router.post('/', [validateToken, check('name', 'El nombre es obligatorio').not().isEmpty(),
check('hospital', 'El Id del hospital debe de ser valido').isMongoId(),validateFields], createMedic);


router.put('/:id', [validateToken, check('name', 'El nombre es obligatorio').not().isEmpty(),
check('hospital', 'El Id del hospital debe de ser valido').isMongoId(),validateFields], updateMedic);

router.delete('/:id', validateToken ,deleteMedic);    

module.exports = router;