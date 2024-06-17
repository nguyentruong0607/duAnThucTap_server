const myModel = require("../models/product.model");
const billModel = require("../models/Bill")

exports.list = async (req, res, next) => {
  
  let dieu_kien =null;
  let dieu_kien1 = null;
  if(typeof(req.query.id_cat)!='undefined'||typeof(req.query.sizes)!='undefined'){
      let id_cat =req.query.id_cat;
      let size = req.query.sizes;
      
      dieu_kien={id_cat:id_cat,'sizes.size': size};
      dieu_kien1 = {size:size};
      console.log(dieu_kien);
  }
  var posts = await myModel.productModel.find(dieu_kien1).populate('id_cat'); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();
  const filteredPosts = posts.filter(post => post.status == true);

  res.render("product/list", {
    listProduct: filteredPosts,
    listLoai: loaiSP,
});
};
exports.list1 = async (req, res, next) => {
  
  let dieu_kien =null;
  let dieu_kien1 = null;
  if(typeof(req.query.id_cat)!='undefined'||typeof(req.query.sizes)!='undefined'){
      let id_cat =req.query.id_cat;
      let size = req.query.sizes;
      dieu_kien={id_cat:id_cat,'sizes.size': size};
      dieu_kien1 = {size:size};
      console.log(dieu_kien);
  }
  var posts = await myModel.productModel.find().populate('id_cat');

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();

  res.render("product/list", {
    listProduct: posts,
    listLoai: loaiSP,
});
};
exports.chitietProduct = async (req, res, next) => {
  let objSp = await myModel.productModel.findById(req.params.idsp).populate("id_cat");
  let listtl=await myModel.categoryModel.findOne({_id:objSp.the_loai});  
  const loaiSP = await myModel.categoryModel.find();
  res.render('product/chitiet', { title: 'chitiet', objSp: objSp, listtl: listtl,listLoai:loaiSP })
}
exports.locPrice = async (req, res, next) => {
  const size = req.body.size;
  const description = req.body.description;

  var pro = await myModel.productModel.find({id_cat: req.body.id_cat, size,description})
  .populate("id_cat");
  console.log(pro);

  const loaiSP = await myModel.categoryModel.find();

  res.render("product/list", {
    listProduct: pro,
    listLoai: loaiSP,
});
}
exports.filter = async (req, res, next) => {
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let filter = {};
  let allSizes = [];
  try {

    if (!Array.isArray(allSizes)) {
      allSizes = [];
    }

  if (typeof req.query.id_cat !== 'undefined' || typeof req.query.size !== 'undefined' || typeof req.query.minPrice !== 'undefined'  || typeof req.query.maxPrice !== 'undefined' ) {
    let id_cat = req.query.id_cat;
    let size = req.query.size;

    console.log("id_cat:", id_cat);
    console.log("size:", size); 
    if (id_cat && size) {
      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        filter = { $and: [ { "id_cat": id_cat }, { "sizes": { $elemMatch: { "size": size } } }, {"price": { $gte: minPrice, $lte: maxPrice }} ] };
      } else {
        // Handle the case when either minPrice or maxPrice is not provided
        filter = { $and: [ { "id_cat": id_cat }, { "sizes": { $elemMatch: { "size": size } } } ] };
      }
    } else if (id_cat) {
      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        filter = {
          "id_cat": id_cat,
          "price": { $gte: minPrice, $lte: maxPrice }
        };
      } else {
        // Handle the case when either minPrice or maxPrice is not provided
        filter = { "id_cat": id_cat };
      }
    } else if (size) {
      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        filter = {
          "sizes": { $elemMatch: { "size": size } },
          "price": { $gte: minPrice, $lte: maxPrice }
        };
      } else {
        // Handle the case when either minPrice or maxPrice is not provided
        filter = { "sizes": { $elemMatch: { "size": size } } };
      }
    }else if(minPrice && maxPrice){
      filter = {
        "price": { $gte: minPrice, $lte: maxPrice }
      };
    }
    console.log("filter:", filter);
    // Use the 'filter' object in your MongoDB query
  }

  // var posts = await myModel.productModel.find(filter).populate("id_cat");
  const posts = await myModel.productModel.find(filter).populate("id_cat");
      posts.forEach(post => {
        post.sizes.forEach(size => {
          if (!allSizes.includes(size.size)) {
            allSizes.push(size.size);
          }
        });
      });

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();
  const filteredPosts = posts.filter(post => post.status == true);
  console.log("allSizes:", allSizes);

  res.render("product/list", {
    listProduct: filteredPosts,
    listLoai: loaiSP,
    allSizes: allSizes,
});
} catch (err) {
  console.error(err);
  res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu của bạn");
}
};

exports.searchCloseProduct = async (req, res, next) => {
  // var product = await myModel.productModel.find({ name: req.body.name }).populate('id_cat');

  const searchInput = req.query.name;

  try {
    // Check if searchInput is a valid string
    if (typeof searchInput !== 'string') {
        return res.status(400).json({ error: 'Invalid search input' });
    }

    // Use $regex with a valid string
    const product = await myModel.productModel.find({ name: { $regex: new RegExp(searchInput, 'i') } }).populate('id_cat');

    const filteredPosts = product.filter(post => post.status == false);


    let listTheLoai = await myModel.categoryModel.find();
  res.render('product/closeProduct', {
    listProduct: filteredPosts, 
    listLoai: listTheLoai
  });

} catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
}

}

exports.searchProduct = async (req, res, next) => {
  // var product = await myModel.productModel.find({ name: req.body.name }).populate('id_cat');

  const searchInput = req.query.name;

  try {
    // Check if searchInput is a valid string
    if (typeof searchInput !== 'string') {
        return res.status(400).json({ error: 'Invalid search input' });
    }

    // Use $regex with a valid string
    const product = await myModel.productModel.find({ name: { $regex: new RegExp(searchInput, 'i') } }).populate('id_cat');

    const filteredPosts = product.filter(post => post.status == true);

    let listTheLoai = await myModel.categoryModel.find();
  res.render('product/list', {
    listProduct: filteredPosts, 
    listLoai: listTheLoai
  });

} catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
}

}
const date = new Date();
const formattedDateVN = date.toLocaleDateString('en-GB');
exports.addProduct = async (req, res, next) => {
  const loaiSP = await myModel.categoryModel.find();
if (req.method == "POST") {
  
  let objPr = new myModel.productModel();
    objPr.name = req.body.name;
    objPr.id_cat = req.body.id_cat;
    objPr.trademark = req.body.trademark;
    objPr.price = req.body.price;
    objPr.description = req.body.description;
    objPr.images = req.files.map(file => ({ image: file.filename }));
    objPr.gianhap=req.body.gianhap;
    objPr.sizes = req.body.sizes.map((size) => ({
      size: size.size,
      quantity: size.quantity
    }))
    objPr.status = req.body.status || true;
    objPr.date = formattedDateVN;

  try {
    await objPr.save();
    console.log(new_sp);
    console.log("Thêm Thành Công");
    res.redirect('/product/list');
  } catch (error) {
    msg = "Lỗi " + error.message;
  }
}
res.render("product/addProduct", {
  listLoai: loaiSP,
});
}
exports.category =async(req,res,next) => {
  const loaiSP = await myModel.categoryModel.find();
  var posts = await myModel.productModel.find().populate('id_cat');

  res.render("product/category", {listLoai: loaiSP,posts:posts});
}

exports.filterCategory = async(req, res, next) => {
  const searchInput = req.query.name;
  if (typeof searchInput !== 'string') {
    return res.status(400).json({ error: 'Invalid search input' });
}
  const loaiSP = await myModel.categoryModel.find({ name: { $regex: new RegExp(searchInput, 'i') } });
  var posts = await myModel.productModel.find().populate('id_cat');

  res.render("product/category", {listLoai: loaiSP,posts:posts});
}

exports.addCategory = async (req, res, next) => {
  const loaiSP = await myModel.categoryModel.find();
  if (req.method == 'POST') {
    let objSp = new myModel.categoryModel();
    objSp.name = req.body.name;
    try {
        let new_sp = await objSp.save();
        console.log(new_sp);
        msg = "da them thanh cong "
        res.redirect('/product/Category');
    } catch (error) {
        console.log(error);
    }
}
  res.render("product/addCategory", {listLoai:loaiSP});
}
exports.updateProduct = async(req, res, next) => {
  const loaiSP = await myModel.categoryModel.find();
  let objPr = await myModel.productModel.findById(req.params.idsp)
  if (req.method == "POST") {
    
    let objPr = new myModel.productModel();
      objPr.name = req.body.name;
      objPr.id_cat = req.body.id_cat;
      objPr.trademark = req.body.trademark;
      objPr.price = req.body.price;
      objPr.gianhap=req.body.gianhap;
      objPr.description = req.body.description;
      objPr.images = req.files.map(file => ({ image: file.filename }));
      objPr.sizes = req.body.sizes.map((size) => ({
        size: size.size,
        quantity: size.quantity,
      }))
      objPr._id = req.params.idsp;
      objPr.status = req.body.status;
  
    try {
      // await objPr.save();
      await myModel.productModel.findByIdAndUpdate({ _id: req.params.idsp }, objPr)
      res.redirect('/product/list');
      console.log(new_sp);
    
    } catch (error) {
      msg = "Lỗi " + error.message;
    }
  }
  res.render("product/editProduct", {
    listLoai: loaiSP,objPr : objPr,
  });
}
exports.updatestatusProduct = async(req, res, next) => {
  const idpro = req.params.id;
try {
  let objPr = await myModel.productModel.findById(idpro);
  if (!objPr) {
    return res.status(404).json({ message: 'Không tìm thấy hàng' });
  } else {
    objPr.status = !objPr.status; // Toggle the status
    await objPr.save();
    res.redirect('/product/list');

    const filteredProducts = await myModel.productModel.find({ status: true }).populate('id_cat');;
    const loaiSP = await myModel.categoryModel.find();
    res.render('product/list', { products: filteredProducts,listLoai:loaiSP });
  }

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái sản phẩm' });
}

}

exports.updatestatusProductHethang = async(req, res, next) => {
  const idpro = req.params.id;
try {
  let objPr = await myModel.productModel.findById(idpro);
  if (!objPr) {
    return res.status(404).json({ message: 'Không tìm thấy hàng' });
  } else {
    objPr.status = !objPr.status; // Toggle the status
    await objPr.save();
    res.redirect('/product/closeProduct');

    const filteredProducts = await myModel.productModel.find({ status: false }).populate('id_cat');;
    const loaiSP = await myModel.categoryModel.find();
    res.render('product/closeProduct', { products: filteredProducts,listLoai:loaiSP });
  }

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái sản phẩm' });
}

}

exports.updateCategory = async (req, res, next) => {
  let msg = '';
  let objSp = await myModel.categoryModel.findById(req.params.idTl);
  console.log(objSp);
  if (req.method == 'POST') {
      let objSP = new myModel.categoryModel();
      objSP.name = req.body.name;
      objSP._id = req.params.idTl;
      try {
          // update dữ liệu
          // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
          await myModel.categoryModel.findByIdAndUpdate({ _id: req.params.idTl }, objSP);

          console.log("Đã ghi thành công");
          msg = 'Đã ghi thành công';
          res.redirect('/product/Category');
      } catch (err) {
          console.log(err);
          msg = 'Lỗi ' + err.message;
      }
  }
  res.render('product/updateCategory', { title: 'updateCategories', msg: msg , objSp:objSp })
}
exports.deleteCategory = async (req, res, next) => {
  let mssg = '';
  try {
      let id = req.params.id;
      var product_delete = await myModel.categoryModel.findByIdAndDelete(id);
      if (!product_delete) {
          mssg = "that bai";
          console.log(mssg);
      } else {
          mssg: " da xoa";
          res.redirect('/product/Category');

      }

  } catch (err) {
      res.status(500).json({ message: err.message })

  }
}
exports.closeProduct = async (req, res, next) => {
  let dieu_kien =null;
  let dieu_kien1 = null;
  if(typeof(req.query.id_cat)!='undefined'||typeof(req.query.sizes)!='undefined'){
      let id_cat =req.query.id_cat;
      let size = req.query.sizes;
      dieu_kien={id_cat:id_cat,'sizes.size': size};
      dieu_kien1 = {size:size};
      console.log(dieu_kien);
  }
  var posts = await myModel.productModel.find(dieu_kien1).populate('id_cat'); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();
  const filteredPosts = posts.filter(post => post.status == false);

  res.render("product/closeProduct", {
    listProduct: filteredPosts,
    listLoai: loaiSP,
});
}
exports.filterClosedProduct = async (req, res, next) => {
  
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let filter = {};
  if (typeof req.query.id_cat !== 'undefined' || typeof req.query.size !== 'undefined' || typeof req.query.minPrice !== 'undefined'  || typeof req.query.maxPrice !== 'undefined' ) {
    let id_cat = req.query.id_cat;
    let size = req.query.size;

    console.log("id_cat:", id_cat);
    console.log("size:", size);
   

   
    if (id_cat && size) {
      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        filter = { $and: [ { "id_cat": id_cat }, { "sizes": { $elemMatch: { "size": size } } }, {"price": { $gte: minPrice, $lte: maxPrice }} ] };
      } else {
        // Handle the case when either minPrice or maxPrice is not provided
        filter = { $and: [ { "id_cat": id_cat }, { "sizes": { $elemMatch: { "size": size } } } ] };
      }
    } else if (id_cat) {
      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        filter = {
          "id_cat": id_cat,
          "price": { $gte: minPrice, $lte: maxPrice }
        };
      } else {
        // Handle the case when either minPrice or maxPrice is not provided
        filter = { "id_cat": id_cat };
      }
    } else if (size) {
      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        filter = {
          "sizes": { $elemMatch: { "size": size } },
          "price": { $gte: minPrice, $lte: maxPrice }
        };
      } else {
        // Handle the case when either minPrice or maxPrice is not provided
        filter = { "sizes": { $elemMatch: { "size": size } } };
      }
    }else if(minPrice && maxPrice){
      filter = {
        "price": { $gte: minPrice, $lte: maxPrice }
      };
    }
    
  
    console.log("filter:", filter);
    // Use the 'filter' object in your MongoDB query
  }

  var posts = await myModel.productModel.find(filter).populate("id_cat"); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();
  const filteredPosts = posts.filter(post => post.status == false);

  res.render("product/closeProduct", {
    listProduct: filteredPosts,
    listLoai: loaiSP,
});

};
exports.searchByPriceRange = async (req,res) => {
  try {
    let minPrice = req.query.minPrice
    let maxPrice = req.query.maxPrice
    const posts = await myModel.productModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
    const loaiSP = await myModel.categoryModel.find();
    const filteredPosts = posts.filter(post => post.status == true);

  res.render("product/list", {
    listProduct: filteredPosts,
    listLoai: loaiSP,
});
  } catch (error) {
    throw new Error('Error while searching products by price range');
  }
};