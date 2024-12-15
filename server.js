
const express = require("express");
const app = express();

const db = require("./db");

const Port = process.env.Port || 2000;

const passport = require("./auth.js")
const menuItem = require("./models/menuItem.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());



// middle ware function
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
}



app.use(logRequest);

app.use(passport.initialize());

const userAuth = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("welcome to our new hotel: How may I help u");
});

const menuRoutes = require("./routes/menuRoutes.js");
app.use("/menu", menuRoutes);

const personRoutes = require("./routes/personRoutes.js");
app.use("/person",userAuth, personRoutes);

app.listen(Port, () => {
  console.log("listening on port: 2000");
});






