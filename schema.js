const joi=require("joi");

const DEFAULT_IMG =
 "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?fm=jpg&q=60&w=3000&auto=format&fit=crop";

module.exports.listingSchema=joi.object({
        title:joi.string()
            .trim()
            .min(3)
            .max(100)
            .required(),

        description: joi.string()
            .trim()
            .min(10)
            .required(),

        image:joi.object({
            filname:joi.string()
                .default("listingimage"),
            url:joi.string()
                .allow("",null)
                .default(DEFAULT_IMG)
                .custom((value,helper)=>{
                    if(!value || value.trim()==="") return DEFAULT_IMG;
                    return value.trim();
                })
        }).default(),
        
        price:joi.number()
            .min(0)
            .required(),

        location:joi.string()
            .trim()
            .required(),

        country: joi.string()
            .trim()
            .required(),
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required()
});