const BillMore = require('../../models/BillMore');
const Cart = require('../../models/Cart');

const axios = require('axios');
const Notify = require('../../models/Notify');


const MyModel = require('../../models/product.model'); // Adjust the path based on your project structure


class ApiController {

    addBill = async (req, res, next) => {
        try {
            const billmore = req.body;
            const productList = billmore.list;

            // Iterate through each product in the bill
            // for (const product of productList) {
            //     const productId = product.id_product;
            //     const size = product.size;
            //     const quantityToReduce = product.quantity;

            //     // Find the product in the inventory by ID
            //     const foundProduct = await MyModel.productModel.findById(productId);

            //     if (foundProduct) {
            //         // Find the size in the product's sizes array
            //         const foundSize = foundProduct.sizes.find((s) => s.size === size);

            //         if (foundSize && foundSize.quantity >= quantityToReduce) {
            //             // Update the quantity of the specific size in the inventory
            //             foundSize.quantity -= quantityToReduce;

            //             // Save the changes to the product
            //             await foundProduct.save();
            //         } else {
            //             // Handle the case where the specified size is not available in sufficient quantity
            //             return res.status(400).json({ error: 'Insufficient quantity for the specified size.' });
            //         }
            //     } else {
            //         // Handle the case where the specified product ID is not found in the inventory
            //         return res.status(400).json({ error: 'Product not found in inventory.' });
            //     }
            // }
        const idArray = billmore.list.map(item => item._id);
        const token = req.params.token;
        BillMore.create(billmore).then(billmore => {
            Cart.deleteMany({ _id: { $in: idArray } })
                .then(() => {
                            const data = {
                                "data": {
                                    "title": "Có thông báo mới",
                                    "body": "Đơn hàng có mã " + billmore.id + " đặt thành công",
                                },
                                "to": token
                            };
                            const headers = {
                                "Authorization": 'key=AAAA0ev3PJg:APA91bHTxySW9rLJIK_w3kftopTPUJHR7RTIuZK8rFFvCi2G5EKk1EHoq-rVARhldurbbuSGo6QAPw91X12ohT1IGbjjeQVO8lWZEnry0c8o9IojlPkTsfK0JLFQb48j1UglV_x6LQTO',
                                "Content-Type": "application/json"
                            };
                            axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
                                .then(function (response) {
                                    console.log('gửi thông báo đến thiết bị thành công', data)
                                })
                                .catch(function (error) {
                                    console.log('gửi thông báo đến thiết bị thất bại', error)
                                });
                            res.json(billmore);

                        }
                    ).catch(err => { 
                        console.log(err);
                        res.json(err) });
                })
                .catch(err => { 
                    console.log(err);
                    res.json(err) })
        } catch (error) {
            // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

    getAll(req, res, next) {
        const id_user = req.params.id_user;
        BillMore.find({ id_user: id_user })
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => res.json(null));
    }

    cancelBill = async (req, res, next) => {
        const id_billmore = req.params.id_billmore;
  try {
    const billmore = await BillMore.findOne({ _id: id_billmore });

    if (billmore.status === 0) {
      // Hủy đơn hàng và cộng lại số lượng sản phẩm
    //   for (const product of billmore.list) {
    //     const productId = product.id_product;
    //     const size = product.size;
    //     const quantityToRestore = product.quantity;

    //     // Tìm sản phẩm trong kho theo ID
    //     const foundProduct = await MyModel.productModel.findById(productId);

    //     if (foundProduct) {
    //       // Tìm size tương ứng trong mảng sizes của sản phẩm
    //       const foundSize = foundProduct.sizes.find((s) => s.size === size);

    //       if (foundSize) {
    //         // Cộng lại số lượng của size cụ thể trong kho
    //         foundSize.quantity += quantityToRestore;

    //         // Lưu các thay đổi vào sản phẩm
    //         await foundProduct.save();
    //       } else {
    //         return res.status(400).json({ error: 'Không tìm thấy size tương ứng.' });
    //       }
    //     } else {
    //       return res.status(400).json({ error: 'Không tìm thấy sản phẩm trong kho.' });
    //     }
    //   }

      // Đánh dấu đơn hàng đã hủy
      billmore.status = 4;
      await billmore.save();
      res.json(1); // Trả về mã thành công
    } else {
      res.json(-1); // Trả về mã lỗi
    }
  } catch (err) {
    res.json(err); // Xử lý lỗi
  }
    }

    updateBill(req, res, next) {
        const id_billmore = req.params.id_billmore;
        BillMore.findOne({ _id: id_billmore })
            .then(billmore => {
                if (billmore.status === 3) {
                    billmore.status = 5;
                    billmore.save().then(rs => res.json(1)).catch(err => res.json(err));
                } else {
                    res.json(-1);
                }
            })
            .catch(err => res.json(err));
    }

    updateBillHuy(req, res, next) {
        const id_billmore = req.params.id_billmore;
        BillMore.findOne({ _id: id_billmore })
            .then(billmore => {
                if (billmore.status === 4) {
                    billmore.status = 0;
                    billmore.save().then(rs => res.json(1)).catch(err => res.json(err));
                } else {
                    res.json(-1);
                }
            })
            .catch(err => res.json(err));
    }
}



module.exports = new ApiController;