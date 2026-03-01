const { listingSchema ,reviewSchema} = require("../schema");
const ExpressError=require("../utils/ExpressErr");

//middleware to validate
const validateListing = (req, res, next) => {
  if (typeof req.body.image === "string") {
    req.body.image = { url: req.body.image };
  }
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};
//middleware to validate
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports={validateListing,validateReview};