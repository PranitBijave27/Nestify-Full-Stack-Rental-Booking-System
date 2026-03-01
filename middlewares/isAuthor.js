const Review = require("../models/Reviews");

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error","You did not write this review!");
        return res.redirect(`/listing/${id}`);
    }
    next();
};