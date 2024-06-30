const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api/api-cart');


router.get('/delete/:id_cart',apiController.delete);
router.post('/add', apiController.addProduct);
router.get('/:id_user', apiController.getAll);





module.exports = router;