var db = require('./db');


const Cart = new db.mongoose.Schema({
    id_user: { type: String, require: true },
    id_product: { type: String, require: true },
    image: { type: String },
    name_product: { type: String },
    price_product:{ type: Number},
    quantity:{ type: Number, require: true },
    size: { type: Number, require: true },
    importPrice:{ type: Number}
}, {
    collection: "carts"
});

module.exports = db.mongoose.model('Cart', Cart);