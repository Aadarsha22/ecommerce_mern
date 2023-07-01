const mongoose = require("mongoose");
const router = require("./productController");
const authGuard = require("../auth/authGuard");
const Order = require("../models/orderModel");

router.post("/create", authGuard,async(req,res) => {
    const {cart, totalAmount, shippingAddress} = req.body;
    if (
        !cart ||
        !totalAmount ||
        !shippingAddress
      ) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }

      try {
        const order = new Order({
            cart: cart,
            totalAmount: totalAmount,
            shippingAddress: shippingAddress,
            user: req.user.id
        })

        await order.save();
        res.json("Order created successfully");
        
      } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
        
      }
});

router.get("/get_single",authGuard,async(req,res) => {
    try {
        console.log("req inside get single",req.user)
        const orders = await Order.find({user: req.user.id});
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
});

router.get("/get_all",authGuard,async(req,res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.json("Order Fetch Failed");
    }
});

//change order status
router.put("/change_status/:id",async(req,res)=>{
    try {
        //find the order
        const order = await Order.findById(req.params.id);
        order.status = req.body.status;
        await order.save();
        res.json("Order status changed successfully");
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
        
    }
})


module.exports = router;