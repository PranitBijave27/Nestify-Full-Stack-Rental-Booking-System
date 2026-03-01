const Review = require("../models/Reviews");
const Listing = require("../models/listing");

module.exports.addReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success",`Successfully created review !`)
    res.redirect(`/listing/${listing._id}`);
}

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success",`Successfully deleted review !`)
    res.redirect(`/listing/${id}`);
  }