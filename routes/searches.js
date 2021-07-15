/**
 *   route: api/all/:search
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateToken } = require('../middlewares/validate-jwt');
const { searchAll, searchByCollection } = require('../controllers/searchesController');

const router = Router();

router.get('/:search', validateToken, searchAll)
router.get('/collection/:table/:search', validateToken, searchByCollection)

module.exports = router;