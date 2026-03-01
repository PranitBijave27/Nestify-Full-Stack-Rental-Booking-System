const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../middlewares/validators");
const { isLoggedIn } = require("../middlewares/isloggedIn");
const { isReviewAuthor } = require("../middlewares/isAuthor");
const reviewController=require("../controllers/reviewController");

//add review 
router.post("/",
  [isLoggedIn,validateReview],
  wrapAsync(reviewController.addReview),
);

//delete review 
router.delete( "/:reviewId",
  [isLoggedIn,isReviewAuthor],
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;