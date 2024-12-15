const mongoose = require("mongoose");

require("dotenv").config();

// const mongoUrl = process.env.Mongo_Url_Local;
const mongoUrl = process.env.Mongo_Url_Atlas;

mongoose.connect(mongoUrl,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;


db.on("connected",()=>{
    console.log("connected to mongodb server");
})
db.on("error",(err)=>{
    console.log("connected to mongodb server",err);
})
db.on("disconnected",()=>{
    console.log("mongodb server is disconnected");
})

module.exports = db;
