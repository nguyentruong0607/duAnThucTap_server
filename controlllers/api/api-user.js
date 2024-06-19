const MyModel = require('../../models/model')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
exports.listUsers = async (req, res, next) => {
    let dataR = {

    }

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.usersModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}



exports.addUsers =async (req, res, next) => {
    let dataR = {

    }
    if(req.method =='POST'){
       
        let objUser = new MyModel.usersModel();
        objUser.email = req.body.email;
        objUser.username = req.body.username;
        objUser.password=req.body.password;
        objUser.role = 'User';
        objUser.fullname = req.body.fullname;
        objUser.image = req.body.image;
        objUser.sex= req.body.sex;
        objUser.phone= req.body.phone;
        objUser.dob = req.body.dob;
        objUser.tokenNotify = req.body.tokenNotify
        
        try{
            let dataR = await objUser.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }

    //code xử lý add


    //trả về client
    res.json(dataR)

}

exports.loginUser = async (req, res, next) =>{  
    try {
      const { username, password,role } = req.body;
  
      const user = await MyModel.usersModel.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Mật khẩu không chính xác' });
      }
    //   const token = jwt.sign({ userId: user._id }, 'secretKey');
  
    //   res.json({ token });
      res.status(201).json({ message: 'Đăng nhập thành công',password: user.password,
      role: user.role,_id: user._id,email: user.email, username: user.username,phone: user.phone, 
      image: user.image,phone: user.phone,dob: user.dob,sex: user.sex,role: user.role,fullname: user.fullname});
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      res.status(500).json({ message: 'Đăng nhập thất bại' });
    }
}
exports.UpdatePass = async (req, res) => {
  let data = {
    status: 1,
    msg: "Update successful"
  }

  if (req.method === 'PUT') {
    try {
      const user = await MyModel.usersModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ status: 0, msg: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ status: 0, msg: "Current password is incorrect" });
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ status: 0, msg: "New password and confirm password do not match" });
      }
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      await MyModel.usersModel.updateOne({ _id: req.params.id }, {
        $set: { password: hashedPassword }
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      data.msg = err.message;
      res.status(500).json(data);
    }
  } else {
    res.status(400).json({ status: 0, msg: "Invalid request method" });
  }
};

exports.registerUser = async (req, res, next) =>{

      const { username, fullname, email ,password, dob, phone, tokenNotify} = req.body;
      const existingUser = await MyModel.usersModel.findOne({ username });
      const existingEmail = await MyModel.usersModel.findOne({ email });
      const existingPhone = await MyModel.usersModel.findOne({ phone });
      const role = 'User';
      const image = 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'
      const sex = 'Khác'
      
      if (existingUser) {
        return res.status(409).json({ message: 'Tên người dùng đã tồn tại' });
      }
      if (existingEmail) {
        return res.status(401).json({ message: 'Email người dùng đã tồn tại' });
      }
      if (existingPhone) {
        return res.status(403).json({ message: 'Phone người dùng đã tồn tại' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPerson = new MyModel.usersModel({ username, fullname , email, image, password: hashedPassword, dob, role, sex, phone, tokenNotify });
    
      newPerson
        .save()
        .then(() => {
          res.status(201).json({ message: "Đăng ký thành công" });
        })
        .catch((error) => {
          console.error("Lưu thất bại:", error);
          res.status(500).json({ error: "Lỗi server" });
        });
}
exports.updateUsers = async (req, res, next) => {
  let dataR = {
      status: 1,
      msg: "ok"
  }

  if(req.method =='PUT'){
  try {
    await MyModel.usersModel.updateOne({ _id: req.params.id}, {
      $set: {
              image: req.body.image,
              username: req.body.username,
              fullname: req.body.fullname,
              password: req.body.password,
              email: req.body.email,
              phone: req.body.phone,
              role: "User",
              dob: req.body.dob,
              sex: req.body.sex,
              
            },
    })
    console.log(dataR);

    console.log("Đã cập nhật thành công");
  }catch(err){
      console.log(err);
      dataR.msg = err.message;
  }}
res.json(dataR)
};

exports.updateUserss = async (req, res, next) => {
  let data = {
      status: 1,
      msg: "Thanh cong update"
  }

  if(req.method =='PUT'){
  try {
    await MyModel.usersModel.updateOne({ _id: req.params.id}, 
      { $set: {
              image: req.file.filename,
              username: req.body.username,
              fullname: req.body.fullname,
              password: req.body.password,
              email: req.body.email,
              phone: req.body.phone,
              role: "User",
              dob: req.body.dob,
              sex: req.body.sex,
            },
    })
    res.status(200).json(data);
  }catch(err){
      console.log(err);
      data.msg = err.message;
  }}else {
    res.status(400).json({ status: 0, msg: "Invalid request method" });
  }
};

exports.tokenNotify = (req, res, next) => {
  const id_user = req.params.id_user;
  const tokenNotify = req.body.tokenNotify;
  console.log(id_user + "- " + tokenNotify)
  MyModel.usersModel.updateOne({ _id: id_user }, { $set: { tokenNotify: tokenNotify } })
      .then((rs) => res.json(rs.modifiedCount))
      .catch(err => res.json(err));

}

exports.sendOTP = async (req, res, next) => {
  const { username } = req.body;
  const resetToken  = Math.random().toString(36).slice(-8);

  try {
      await MyModel.usersModel.updateOne(
          { username },
          { $set: { resetToken, resetTokenExpiration: Date.now() + 3600000 } }
      );
      const user1 = await MyModel.usersModel.findOne({username});

      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'tuyentvph25898@fpt.edu.vn',
              pass: 'hvtnrpwffbcztgsc',
          },
      });

      const mailOptions = {
          from: 'tuyentvph25898@fpt.edu.vn',
          to: user1.email,
          subject: 'Password Reset',
          text: `Your reset token is ${resetToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              res.status(500).send('Error sending email');
          } else {
              console.log('Email sent:', info.response);
              res.status(200).send('Email sent successfully');
          }
      });
  } catch (error) {
      console.error('Error saving reset token to the database:', error);
      res.status(500).send('Error saving reset token to the database');
  }
};

exports.verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
      const user = await MyModel.usersModel.findOne({
          resetToken: otp,
          resetTokenExpiration: { $gt: Date.now() },
      });

      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      return res.status(200).json({ message: 'OTP verification successful' });
  } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { username, newPassword } = req.body;

  try {
      // Lấy thông tin người dùng từ email
      const user = await MyModel.usersModel.findOne({ username });

      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Đặt lại mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      await user.save();

      return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};
