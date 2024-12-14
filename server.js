
const express = require("express");
const app = express();

const db = require("./db");


const menuItem = require("./models/menuItem.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/",function(req,res){
    res.send("welcome to our new hotel: How may I help u");
});

const menuRoutes = require("./routes/menuRoutes.js");
app.use("/menu", menuRoutes);

const personRoutes = require("./routes/personRoutes.js");
app.use("/person", personRoutes);






app.listen(2000, () => {
  console.log("listening on port: 2000");
});

// console.log("Hey there this our first program");



