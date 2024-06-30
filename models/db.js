const mongoose = require('mongoose');

console.log("11111");
mongoose.connect('mongodb+srv://root:1234@cluster0.li3354b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

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