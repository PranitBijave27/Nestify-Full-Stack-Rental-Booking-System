if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErr");
const listingRouter = require("./routes/listingRouter");
const reviewRouter = require("./routes/reviewRouter");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/User");
const userRouter=require("./routes/userRouter");
const connectDB = require("./config/db");

const sessionOptions={
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
    secure:false,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware-1
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/",userRouter);
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews",reviewRouter);

//404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

//  Error Handler //
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  if (statusCode === 404 || err.name === 'CastError') {
    return res
      .status(404)
      .sendFile(path.join(__dirname, "public", "html", "404.html"));
  }
  return res.status(statusCode).render("error", { message });
});


async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server Started on http://localhost:${PORT}/listing`);
    });
  } catch (err) {
    console.log("server failed to start");
  }
}

startServer();