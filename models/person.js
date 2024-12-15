const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  mobileNo: {
    type: Number,
    required: true,
    unique: true
  },
  salary: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
  { timestamps: true }
);


personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //override the plain password with hashed one
    person.password = hashedPassword;
  } catch (err) {
    return next(err);
  }
  next();
})

personSchema.methods.comparePassword = async function (candidatePassword) {
   try{
const isMatch = await bcrypt.compare(candidatePassword,this.password);
return isMatch;
   }catch(err){
    throw err;
   }
}

const person = mongoose.model("person", personSchema);
module.exports = person;