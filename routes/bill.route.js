const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');
var check_login = require('../middleware/check_login')


router.get('/listBills',check_login.request_login ,billController.listBill);

router.get('/listBillTK',check_login.request_login ,billController.listThongke);
router.get('/listBillTKTop10Kb',check_login.request_login ,billController.listThongke10SPBancham);

// loc tim kiem don hang
router.get('/listBillsDanhan/filter',check_login.request_login ,billController.filter);
router.get('/listBillsXacnhan/filter',check_login.request_login ,billController.filterXacnhan);
router.get('/listBillsDaxacnhan/filter',check_login.request_login ,billController.filterDaXacnhan);
router.get('/listBillsDanggiao/filter',check_login.request_login ,billController.filterDanggiao);
router.get('/listBillsHoanhang/filter',check_login.request_login ,billController.filterHoanhang);

// ----
router.get('/thongketheongay',check_login.request_login ,billController.thongketheongay);
router.get('/thongke',check_login.request_login ,billController.thongke);


router.get('/listBillsXacnhan',check_login.request_login ,billController.listBillXacNhan);
router.get('/listBillsDanhan',check_login.request_login ,billController.listBillsDanhan);
router.get('/listBillsDagiao',check_login.request_login ,billController.listBillsDagiao);
router.get('/listBillsHuydon',check_login.request_login ,billController.listBillsHuydon);

router.get('/listBillsHoanhang',check_login.request_login ,billController.listBillsHoanHang);

// router.post('/updateStatusBill/:idbill', billController.updateStatusBill);
// router.post('/updateStatusBill1/:idbill', billController.updateStatusBill1);


router.post('/updatebillPro/:idbill', check_login.request_login ,billController.updatebillPro);
router.post('/updatebillProHuy/:idbill', check_login.request_login ,billController.updatebillProHuy);
router.post('/updatebillProGiaohang/:idbill', check_login.request_login ,billController.updatebillProGiaohang);
router.post('/updatebillHoantat/:idbill', check_login.request_login ,billController.updatebillHoantat);
router.post('/updatebillHoanhang/:idbill', check_login.request_login ,billController.updatebillHoanhang);


router.get('/seachBill', check_login.request_login ,billController.searchByProductName);
router.get('/searchBillXacNhan', check_login.request_login ,billController.searchBillXacNhan);
router.get('/searchBillDaGiao', check_login.request_login ,billController.searchBillDaGiao);
router.get('/searchBillDaNhan', check_login.request_login ,billController.searchBillDaNhan);
router.get('/searchBillHoanhang', check_login.request_login ,billController.searchBillHoanhang);

module.exports = router;