/**
 *   route: api/uploads/
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateToken } = require('../middlewares/validate-jwt');
const { fileUpload, recoverImage } = require('../controllers/uploadFilesController');
const  expressFileUpload  = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateToken, fileUpload);
router.get('/:type/:img', recoverImage);


module.exports = router;