var express = require('express');
var router = express.Router();
var usercontroller =require('../controllers/users.controller');
var check_login = require('../middleware/check_login')

/* GET users listing. */
router.get('/',check_login.request_login,usercontroller.list);
router.get('/add',check_login.request_login,usercontroller.addUser)
router.post('/add',check_login.request_login,usercontroller.addUser);

router.get('/listOder/:id', check_login.request_login , usercontroller.listOder);

router.get('/searchUser', check_login.request_login, usercontroller.searchUser);
module.exports = router;
