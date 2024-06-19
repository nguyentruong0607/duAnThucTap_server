const MyModel = require("../../models/product.model")
exports.listProduct = async (req, res, next) => {
    let dataR = {  }
    //code xử lý lấy danh sách
    let list = []
    let dieu_kien ={status: true};
    if(typeof(req.query._id)!='undefined' ){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }
    try {
        list = await MyModel.productModel.find(dieu_kien).populate('id_cat');
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.listProductHot = async (req, res, next) => {
  let dataR = { }
  let list = []
  let dieu_kien = { status: true };
  if (typeof(req.query._id) !== 'undefined') {
    let _id = req.query._id;
    dieu_kien = { _id: _id };
    console.log(dieu_kien);
  }
  try {
    list = await MyModel.productModel.find(dieu_kien).sort({ _id: -1 }).limit(6).populate('id_cat');
    dataR.data = list;
    res.json(dataR);
    console.log(dataR);
  }
  catch (err) {
    dataR.msg = err.message;
    res.json(dataR);
  }
}
exports.filterProduct = async (req, res, next) => {
    // let dataR = {};
    // let list = [];
    // let dieu_kien = null;
  
    // console.log(req.query);
  
    // if (typeof req.query.name !== 'undefined') {
    //   const name = req.query.name;
  
    //   // Instead of directly using name in the condition, fetch the id_cat that matches the name
    //   const cat = await MyModel.categoryModel.findOne({ name });
  
    //   if (cat) {
    //     // Use the retrieved cat._id in the condition
    //     const catnameCondition = { 'id_cat': cat._id };
    //     dieu_kien = dieu_kien ? { ...dieu_kien, ...catnameCondition } : catnameCondition;
    //   } else {
    //     // Handle the case where the cat with the specified name is not found
    //     return res.status(404).json({ msg: 'Category not found' });
    //   }
    // }
  
    // try {
    //   list = await MyModel.productModel.find(dieu_kien).populate('id_cat');
    //   dataR.data = list;
    //   res.json(dataR);
    // } catch (err) {
    //   dataR.msg = err.message;
    //   res.status(500).json(dataR);
    // }

    let dataR = {};
    let list = [];
    let dieu_kien = {};
    console.log(req.query);
    
    if (typeof req.query.name !== 'undefined') {
      const name = req.query.name;
      const cat = await MyModel.categoryModel.findOne({ name });
      
      if (cat) {
        dieu_kien = { id_cat: cat._id };
      } else {
        return res.status(404).json({ msg: 'Category not found' });
      }
    }
    
    try {
      list = await MyModel.productModel.find(dieu_kien).populate('id_cat');
      dataR.data = list;
      res.json(dataR);
    } catch (err) {
      dataR.msg = err.message;
      res.status(500).json(dataR);
    }

  };
  



exports.addProduct = async (req,res,next) =>{
    try {
        let objPr = new MyModel.productModel();
        objPr.name = req.body.name;
        objPr.id_cat = req.body.id_cat;
        objPr.trademark = req.body.trademark;
        objPr.price = req.body.price;
        objPr.quantity= req.body.quantity;
        objPr.size = req.body.size;
        objPr.description = req.body.description;
        objPr.note = req.body.description;
        objPr.image = req.body.image;

        await objPr.save();
        res.status(201).json(objPr);


    } catch (error) {
        return res.status(204).json({msg:error.message});
    }
}
exports.editProduct = async (req,res,next) =>{
    try {
        let id = req.params.id;
        let objPr = await MyModel.productModel.findById(id);
        objPr.name = req.body.name;
        objPr.id_cat = req.body.id_cat;
        objPr.trademark = req.body.trademark;
        objPr.price = req.body.price;
        objPr.quantity= req.body.quantity;
        objPr.size = req.body.size;
        objPr.description = req.body.description;
        objPr.note = req.body.description;
        objPr.image = req.body.image;

        await MyModel.productModel.findByIdAndUpdate(id,objPr);
        res.status(201).json(objPr);


    } catch (error) {
        return res.status(204).json({msg:error.message});
    }
}
exports.deleteProduct = async (req, res, next)=>{
    try {
       let id = req.params.id;
      
      
       await MyModel.productModel.findByIdAndDelete(id);
      return res.status(200).json({data:{}});
    } catch (error) {
       console.log(error);
       
    }
     
     }

exports.listCat = async (req,res,next) =>{
        try {
          let  listTL = await MyModel.categoryModel.find();
          res.json(listTL);
       
        }
        catch (err) {
            dataR.msg = err.message;
        }
     }
exports.addCat = async(req,res,next) =>{
        try {
            let objCt = new MyModel.categoryModel();
            objCt.name = req.body.name;
            await objCt.save();
            res.status(201).json(objCt);
        } catch (error) {
            return res.status(204).json({msg:error.message});
        }
      
     }
exports.editCat = async(req,res,next) =>{
        try {
            let id = req.params.id;

            let objCt = await MyModel.categoryModel.findById(id);
            objCt.name = req.body.name;
            await MyModel.categoryModel.findByIdAndUpdate(id,objCt);
            res.status(201).json(objCt);
        } catch (error) {
            return res.status(204).json({msg:error.message});
        }
      
     }
exports.deleteCatgory = async (req, res, next)=>{
        try {
           let id = req.params.id;
          
          
           await MyModel.categoryModel.findByIdAndDelete(id);
          return res.status(200).json({data:{}});
        } catch (error) {
           console.log(error);
           
        }
}

exports.filterPrice = async (req, res) => {
    const minPrice = req.query.minPrice;
     const maxPrice = req.query.maxPrice;

     try {
       let products;

       if (minPrice && maxPrice) {
         products = await MyModel.productModel.find({
           price: { $gte: minPrice, $lte: maxPrice },
         }).sort({price: 1}).populate('id_cat');
       } else if (minPrice) {
         products = await MyModel.productModel.find({ price: { $gte: minPrice } }).sort({price: 1});
       } else if (maxPrice) {
         products = await MyModel.productModel.find({ price: { $lte: maxPrice } }).sort({price: 1});
       }

       res.json(products);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   }
