var db = require('./db');

const Province = new db.mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    slug: { type: String, require: true },
    name_with_type: { type: String, require: true },
    path: { type: String, require: true },
    path_with_type: { type: String, require: true },
    code: { type: String, require: true },
    parent_code: { type: String, require: true },

}, {
    collection: "provinces"
}, {
    timestamps: true
});

module.exports = db.mongoose.model('Province', Province);