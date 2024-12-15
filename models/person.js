const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  work:{
    type: String,
    enum:["chef","manager","waiter"],
    required: true
  },
  email:{
    type: String,
    unique: true,
  },
  mobileNo:{
    type: Number,
    required: true,
    unique: true
  },
  salary:{
    type: Number,
    required: true
  },
  userName:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
},
{timestamps:true}
);

const person = mongoose.model("person",personSchema);

module.exports = person;