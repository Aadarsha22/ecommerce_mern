const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderNumber:{
        type: Number,
        required: true,
        default: Math.floor(10000 + Math.random() * 90000).toString()
    },
    cart:[
        {
            name:{
                type: String,
                required: true,
            },
            price:{
                type: String,
                
            },
            category:{
                type: String,
                
            },
            image:{
                type: String,
            },
            quantity:{
                type: String,
            },
        },
    ],
        totalAmount:{
            type: Number,
            required:true,
        },
        shippingAddress:{
            type: String,
        },
        status:{
            type: String,
            default: "Pending",
        },
        orderedAt:{
            type: Date,
            default: Date.now,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;