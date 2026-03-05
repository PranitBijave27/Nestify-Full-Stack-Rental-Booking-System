const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middlewares/isloggedIn");
const bookingController=require("../controllers/bookingController");

router.route("/")
    .get(isLoggedIn,wrapAsync(bookingController.renderBookingForm))
    .post(isLoggedIn,wrapAsync(bookingController.createBooking))

module.exports =router;