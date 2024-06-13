
const myModel=require('../models/model')
const myModell=require('../models/model');

exports.userLogin = async(req,res,next)=>{
    let msg='';
    let msg1='';
    if(req.method =="POST"){
        console.log(req.body);
        try{
            let objUser = await myModel.usersModel.findOne({username:req.body.username});
            console.log(objUser);
            if(objUser != null){
                if(objUser.password==req.body.password && objUser.role=="Admin"){
                    req.session.userLogin=objUser;
                    console.log(req.session.userLogin);
                    return res.redirect('/');
                }else if(objUser.password==req.body.password && objUser.role=="User"){
                    msg1="Bạn không có quyền truy cập"
                }else{
                    msg=("Vui lòng kiểm tra lại mật khẩu");
                }
            }else{
                msg="Tài khoản không tồn tại"
            }

    }catch(err){
        console.log(err);
    }
        
}
    res.render( 'login/login',{msg:msg,msg1:msg1},)
}
// exports.UserRegister = async(req,res,next)=>{
//     let msg = ''; // ghi câu thông báo

//     if(req.method =='POST'){
//         // xử lý ghi CSDL ở đây
//         // kiểm tra hợp lệ dữ liệu ở chỗ này.

//         if(req.body.password != req.body.password2){
//             msg="Password không khớp"
//             return res.render('login/register',{msg:msg});
//         }
//         // tạo đối tượng model 
//         let objUser = new myModel.usersModel();
//         objUser.email = req.body.email;
//         objUser.username = req.body.username;
//         objUser.password=req.body.password;
//         objUser.role = "User";
        
//         try{
//             let new_user = await objUser.save();
            
//             console.log(new_user);

//             console.log("Đã ghi thành công");
//             msg = 'Đã thêm thành công';
            
//             res.redirect('/login')
//         }catch(err){
//             console.log(err);
//             msg ='Lỗi '+ error.message;

//         }
 
//     }
//     res.render( 'login/register',{msg:msg},)
// }
exports.UserLogout=async (req,res,next)=>{
    req.session.destroy(function(){
        console.log("user logged out.")
      });
      res.redirect('/login');
}
exports.addUser = async (req, res, next)=>{
    let msg = ''; // ghi câu thông báo

    if(req.method =='POST'){
      
        let objUser = new myModell.usersModel();
        objUser.email = req.body.email;
        objUser.username = req.body.username;
        objUser.password=req.body.password;
        objUser.role = req.body.role;
        objUser.fullname = req.body.fullname;
        objUser.image = req.body.image;
        objUser.sex= req.body.gender;
        objUser.phone= req.body.phone;
        objUser.dob = req.body.dob;
        
        try{
            let new_user = await objUser.save();
            
            console.log(new_user);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }
 
    }

    res.render('users/adduser', {msg:msg});
}