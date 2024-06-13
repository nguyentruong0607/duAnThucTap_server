const mongoose = require('mongoose');

console.log("11111");
mongoose.connect('mongodb://127.0.0.1:27017/duAnThucTap')

    .catch((err) => {
        console.log("Loi ket noi CSDL");
        console.log(err);
    })
    .finally((xxx)=>{
        console.log(xxx);
        console.log("ket noi csdl ok");
    })
module.exports={mongoose};
console.log("zzzzzk");