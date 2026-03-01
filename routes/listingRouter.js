const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateListing } = require("../middlewares/validators");
const { isLoggedIn } = require("../middlewares/isloggedIn");
const { isOwner } = require("../middlewares/isOwner");
const listingController = require("../controllers/listingController");
const multer=require("multer");
const {storage}=require("../config/cloudConfig");
const upload=multer({storage});


router.route("/")
    .get(wrapAsync(listingController.index))
    .post([isLoggedIn, upload.single("image"), validateListing],
          wrapAsync(listingController.createListing));

//route to show form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put([isLoggedIn, isOwner,upload.single("image"), validateListing],
          wrapAsync(listingController.updateListing))
    .delete([isLoggedIn, isOwner],
          wrapAsync(listingController.destroyListing),);

          
// edit route
router.get(
  "/:id/edit",
  [isLoggedIn, isOwner],
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
