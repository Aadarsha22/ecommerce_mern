const mongoose= require('mongoose');

//Mongoose connection
const connectDB = () =>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB Connected"+ process.env.DB_URL);
    });
};

module.exports = connectDB;
// if multiple function exists then
// module.exports = {connectDB,mongoose,....};