var db = require('./db');

const Notify = new db.mongoose.Schema({
    id_user: { type: String, require: true },
    content: { type: String, require: true },
    time: { type: Date, default: Date.now },
    status:{ type: Number, require: true },

}, {
    collection: "notifys"
});

module.exports = db.mongoose.model('Notify', Notify);