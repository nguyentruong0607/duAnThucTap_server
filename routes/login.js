var express = require('express');
var router = express.Router();
// nhúng controller 
var userloginController = require('../controlllers/login.controller');


var check_login = require('../middleware/check_login')
router.get('/login', userloginController.userLogin);
router.post('/login', userloginController.userLogin);
router.get('/register',userloginController.addUser);
router.post('/register',userloginController.addUser);
router.get('/logout',userloginController.UserLogout);

module.exports = router;