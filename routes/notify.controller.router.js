const express = require('express');
const router = express.Router();
const apiController = require('../controllers/notify.controller');
var check_login = require('../middleware/check_login')

router.get('/sendNotify',check_login.request_login, apiController.sendNotify);
router.post('/sendNotify',check_login.request_login, apiController.sendNotify);

router.get('/listNotify',check_login.request_login, apiController.listNotify)
router.get('/searchNoitify',check_login.request_login, apiController.filterNotify);


module.exports = router;