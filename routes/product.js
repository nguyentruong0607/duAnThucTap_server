var express = require('express');
var router = express.Router();
var proCtl=require('../controllers/product.controller')
var billCtl=require('../controllers/bill.controller')
var check_login = require('../middleware/check_login')

var multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function name(req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    
}).array('image');

router.get('/list',check_login.request_login , proCtl.list)
router.get('/closeProduct',check_login.request_login , proCtl.closeProduct)
router.get('/searchCloseProduct',check_login.request_login , proCtl.searchCloseProduct);
router.get('/searchProduct',check_login.request_login , proCtl.searchProduct);
router.post('/locPrice',check_login.request_login , proCtl.locPrice)
router.get('/category',check_login.request_login ,proCtl.category);
router.get('/addCategory',check_login.request_login ,proCtl.addCategory);
router.post('/addCategory',check_login.request_login ,proCtl.addCategory);
router.get('/updateCategory/:idTl',check_login.request_login ,proCtl.updateCategory);
router.post('/updateCategory/:idTl',check_login.request_login ,proCtl.updateCategory);
router.get('/deleteCategory/:id', check_login.request_login ,proCtl.deleteCategory);
router.get('/addProduct', check_login.request_login ,proCtl.addProduct)
router.post('/addProduct',check_login.request_login,upload, proCtl.addProduct)
router.get('/updateProduct/:idsp', check_login.request_login ,proCtl.updateProduct)
router.post('/updateProduct/:idsp',check_login.request_login, upload ,proCtl.updateProduct)

router.post('/updatestatusProduct/:id', check_login.request_login ,proCtl.updatestatusProduct)
router.post('/updatestatusProductHethang/:id', check_login.request_login ,proCtl.updatestatusProductHethang)


router.get('/chitiet/:idsp',check_login.request_login ,proCtl.chitietProduct);
router.get('/oder',check_login.request_login ,billCtl.listBill);

router.get('/list/filter',check_login.request_login ,proCtl.filter);
router.get('/closeProduct/filter',check_login.request_login ,proCtl.filterClosedProduct);
router.get('/price/filter',check_login.request_login ,proCtl.searchByPriceRange);

router.get('/searchCategory', check_login.request_login ,proCtl.filterCategory);


module.exports = router;