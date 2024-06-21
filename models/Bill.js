var db = require('./db');



const billSchema = new db.mongoose.Schema({
    id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
    product: [{id_product: {type: db.mongoose.Schema.Types.ObjectId,ref:'productModel'}}],
    id_address : {type: db.mongoose.Schema.Types.ObjectId, ref: 'Address'},
    date:{ type: Date, default: Date.now },
    status:{ type: String, require: true },
    totalQuantity: {type: Number, require: true},
    totalPrice : {type: Number, require: true},
    size: {type: Number, require: true}
}, {
    collection: "bills"
});

let billModel = db.mongoose.model('billModel', billSchema);


module.exports={
    billModel
}