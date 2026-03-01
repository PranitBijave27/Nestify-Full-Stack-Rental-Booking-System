const { types, required } = require("joi");
const mongoose=require("mongoose");
const Schema =mongoose.Schema;

const reviewschmea=new Schema({
    comment:{
        type:String,
        required:[true,"Comment is required"],
        trim:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Review =mongoose.model("Review",reviewschmea);

module.exports=Review;