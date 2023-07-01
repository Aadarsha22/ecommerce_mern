const express = require('express');
const connectDB = require('./database/Databse');
const cors = require('cors');
const cloudinary = require("cloudinary");
const multipart = require('connect-multiparty')


//Dotenv Config
require("dotenv").config();
const app = express();

//express json
app.use(express.json());
app.use(multipart())

//cors config
const corsOptions = {
  origin:true,
  credentials:true,
  optionSuccessStatus:200
};

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET ,
});

app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))

// Create a Route
app.get('/', (req, res) =>{
    res.send('Welcome to API');
  });

  //middleware for user controller
app.use('/api/user',require('./controllers/userControllers'));
  //middleware for product controller
app.use('/api/product',require('./controllers/productController'));
  //middleware for order controller
app.use('/api/order',require('./controllers/orderController'));

//Connect to DB
connectDB();


// Listen to the server
app.listen(process.env.PORT, () =>{
    console.log(`Server is Running on port ${process.env.PORT}`);
});