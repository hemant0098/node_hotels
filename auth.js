const passport = require("passport");
const localStrategy = require("passport-local").Strategy; //usename and password based authentication
const Person = require("./models/person.js");

passport.use(new localStrategy(async (username,pass,done)=>{
   
    try{
       console.log("recieved credentials",username,pass);
       const user =await Person.findOne({userName:username});
       if(!user)
           return done(null,false,{message:"incorrect username."});

       const isPasswordMatch = user.comparePassword(pass);
       if(isPasswordMatch){
        return done(null,user);
       } else{
          return done(null,false,{message: "incorrect password"});
       }
    }catch(err){
        return done(err);
    }
}));

module.exports = passport;