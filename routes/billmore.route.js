const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api/api-billmore');

router.post('/cancel/:id_billmore', apiController.cancelBill);
router.post('/add/:token', apiController.addBill);
router.get('/:id_user', apiController.getAll);
router.post('/update/:id_billmore', apiController.updateBill);

router.post('/updateBill/:id_billmore', apiController.updateBillHuy);


module.exports = router;