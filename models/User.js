const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose =require("passport-local-mongoose")


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
},
  {
    timestamps:true
});
//  passport-local-mongoose automatically adds: username ,hashed password + salt
userSchema.plugin(passportLocalMongoose.default);

module.exports=mongoose.model("User",userSchema);