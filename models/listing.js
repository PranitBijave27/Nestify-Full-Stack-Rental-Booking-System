const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./Reviews");
 
const DEFAULT_IMG =
        "https://www.svgrepo.com/show/451131/no-image.svg";


const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: DEFAULT_IMG,
             set: (url) =>
                !url || url.trim() === "" ? DEFAULT_IMG : url.trim(),
        },
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category: {
        type: String,
        enum: ["beach", "mountain", "cabin", "city", "lake", "luxury", "camping", "farm","snow","castle"],
        required: true
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing && listing.reviews.length >0){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;