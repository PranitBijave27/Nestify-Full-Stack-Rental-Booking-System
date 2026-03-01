const express = require("express");
const router = express();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/saveRedirect");
const userController = require("../controllers/userController");


router.route("/signup")
    .get(userController.renderSignUp)
    .post(wrapAsync(userController.postSignUp));

  
router.route("/login")
    .get(userController.renderLogin)
    .post(
      saveRedirectUrl,
      passport.authenticate("local", { failureRedirect: "/login" ,failureFlash: true,
  }),
  wrapAsync(userController.postLogin)
);


router.get("/logout", userController.logout);

module.exports = router;
