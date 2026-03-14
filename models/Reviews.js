const mongoose=require("mongoose");
const Schema =mongoose.Schema;

const reviewschmea=new Schema({
    comment:{
        type:String,
        required:[true,"Comment is required"],
        trim:true,
        minlength: [10, "Comment must be at least 10 characters"]
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
        required:true
    }
}, { timestamps: true });

const Review =mongoose.model("Review",reviewschmea);

module.exports=Review;