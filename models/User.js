const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose =require("passport-local-mongoose")


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
},
  {
    timestamps:true
});
// console.log("Type of plugin:", typeof passportLocalMongoose);
// console.log("Content of plugin:", passportLocalMongoose);
userSchema.plugin(passportLocalMongoose.default);

module.exports=mongoose.model("User",userSchema);