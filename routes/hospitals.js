/**
 *  Ruta: /api/hospitals
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validateFields } = require('../middlewares/validate-fields');
 const { validateToken } = require('../middlewares/validate-jwt');
 const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitalController')

 const router = Router();
 
 router.get('/', getHospitals);
 
 router.post('/', [validateToken, check('name', 'El nombre debe de ser obligatorio').not().isEmpty(), validateFields], createHospitals);
 
 
 router.put('/:id', [validateToken, check('name', 'El nombre debe de ser obligatorio').not().isEmpty(), validateFields], updateHospitals);
 
 router.delete('/:id' ,deleteHospitals);
 
 module.exports = router;