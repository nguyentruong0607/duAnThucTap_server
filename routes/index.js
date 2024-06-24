var express = require('express');
var router = express.Router();
var controller =require('../controllers/product.controller')
var check_login = require('../middleware/check_login')
/* GET home page. */
router.get('/',check_login.request_login, controller.list)

module.exports = router;
