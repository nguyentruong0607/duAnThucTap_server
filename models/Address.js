var db = require('./db');

const Address = new db.mongoose.Schema({
    id_user: { type: String},
    fullname: { type: String},
    numberphone: { type: String},
    province: { type: String},
    district:{ type: String},
    wards:{ type: String},
    address:{ type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "address"
}, {
    timestamps: true
});

module.exports = db.mongoose.model('Address', Address);