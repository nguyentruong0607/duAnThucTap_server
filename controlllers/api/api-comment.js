const ProModel = require('../../models/model');



exports.lisetComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    let dieu_kien =null;
    if(typeof(req.query.id_product)!='undefined'){
        let id_product =req.query.id_product;
        dieu_kien={id_product:id_product};
        console.log(dieu_kien);
    }

    let list = [];
    try {
        list = await ProModel.binhluanModel.find(dieu_kien).populate("id_product").populate("id_user");
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);

}
exports.listCommentUP = async (req,res,next) =>{
    let dataR = {
        msg: "list"
    }    

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }

    let list = []
    try {
        list = await ProModel.binhluanModel.findById(req.params.idcomment);
        dataR.data = list;
        // dataR.data = listU;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}


exports.postComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Post comment"
    }

    if(req.method == 'POST'){
        let obj = new ProModel.binhluanModel();

        // obj.idproduct = req.body.idproduct;
        obj.id_user = req.body.id_user;
        obj.id_product  = req.body.id_product;
        obj.comment = req.body.comment;


        try{
            let new_commnent = await obj.save();

            console.log(new_commnent);
            console.log("Post comment");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;
        }
    }
    res.json(dataR);
    console.log(dataR);
}

exports.deleteComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Xoa thanh cong"
    }

    let objUser = await ProModel.binhluanModel.findById(  req.params.idcomment  );
    console.log( objUser);

    try {

        await ProModel.binhluanModel.findByIdAndDelete({ _id: req.params.idcomment });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.updateComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Da cap nhap!!!"
    }
    if (req.method == 'PUT') {

        try {

            await ProModel.binhluanModel.updateOne({ _id: req.params.idcomment },
            {
                $set: {
                    id_product: req.body.id_product,
                    id_user: req.body.id_user,
                    comment : req.body.comment

                }
            });
            console.log(dataR);
            console.log("Cap nhap thanh cong");

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }
    }
    res.json(dataR);
    console.log(dataR);
}

exports.getKiemComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    const idproduct = req.params.idproduct;
    try {
        const comments = await Comment.find({idproduct});
        res.json(comments);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
    res.json(dataR);
    console.log(dataR);


}