const router = require("express").Router();
const cloudinary = require("cloudinary");
const Product = require("../models/productModel");
const productModel = require("../models/productModel");
const authGuard = require("../auth/authGuard");

//create a add product router
router.post("/add", authGuard, async (req, res) => {
  console.log(req.body);

  //destructuring
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const { productImage } = req.files;

  //validation
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription ||
    !productImage
  ) {
    return res.json({ msg: "Please enter all fields" });
  }

  //   console.log(process.env.API_KEY)

  try {
    if(productImage){
      //upload image to cloudinary
    const uploadImage = await cloudinary.v2.uploader.upload(productImage.path, {
      folder: "products",
      crop: "scale",
    });

    //create a new product
    const newProduct = new productModel({
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      image: uploadImage.secure_url,
    });
    await newProduct.save();
    res.json("Product registered Successfully");
    }
    else{
      //upload image to cloudinary
    const uploadImage = await cloudinary.v2.uploader.upload(productImage.path, {
      folder: "products",
      crop: "scale",
    });

    //create a new product
    const newProduct = new productModel({
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
   
    });
    await newProduct.save();
    res.json("Product registered Successfully");
    }

  } catch (error) {
    console.log(error);
    res.json("Product registration failed");
  }
});

// get all products
router.get("/get_products", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get SIngle Product
router.get("/get_product/:id",async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.id);
        res.json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

//Updating product
router.put("/update_product/:id",authGuard,async (req,res) => {
    console.log(req.body);

  //destructuring
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const { productImage } = req.files;

  //validation
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription
  ) {
    return res.json({ msg: "Please enter all fields" });
  }

  //   console.log(process.env.API_KEY)

  try {
    const product = await productModel.findById(req.params.id);
    if(productImage){

      const uploadImage = await cloudinary.v2.uploader.upload(productImage.path, {
        folder: "products",
        crop: "scale",
      });
      product.image = uploadedImage.secure_url;
    }

    //update Product
    product.name =productName;
    product.price =productPrice;
    product.category =productCategory;
    product.description =productDescription;

    await product.save();
    res.json("Product registered Successfully");
  } catch (error) {
    console.log(error);
    res.json("Product registration failed");
  }
});

// get all products
router.get("/get_products", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete product
router.delete("/delete_product/:id" ,authGuard ,async (req,res) => {
    try {
        const product = await productModel.findById(req.params.id);
        await product.deleteOne();
        res.status(200).json({message: "Product deleted Sucessfully"});
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

//Search Product
router.get("/search_product/:name",async(req,res) => {
  try {
    const products = await productModel.find({
      name : {
        $regex : req.params.name,
        $options : 'i',
      }
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
    
  }

});


module.exports = router;