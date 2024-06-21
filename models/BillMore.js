var db = require('./db');

const date = new Date();
const formattedDateVN = date.toLocaleDateString('en-GB');
const Bill = new db.mongoose.Schema({
    id_user: { type: String, require: true },
    name: { type: String, require: true },
    phone: { type: String, require: true },
    total:{ type: Number, require: true },
    date:{ type: String, default: formattedDateVN },
    status:{ type: Number, require: true },
    list: [Object],
    address:{ type: String, require: true },
    totalImport:{ type: Number, require: true },
}, {
    collection: "billmores"
});

module.exports = db.mongoose.model('Billmore', Bill);