const User=require("../models/User");

module.exports.renderSignUp=(req,res)=>{
    res.render("users/signupForm");
}

module.exports.postSignUp=async(req,res)=>{
    try{
        let { username,email,password }=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err) next(err);
            req.flash("success","Welcome to Nestify!");
            res.redirect("/listing");
        })
    }catch(err){
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            req.flash("error", `${field} already exists.`);
        }else {
            req.flash("error", "Something went wrong. Please try again");
        }
        res.redirect("/signup");
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render("users/login");
}

module.exports.postLogin=async(req,res)=>{
        let {username}=req.user;
        req.flash("success", `Welcome back ${username} !`);
        let redirectUrl=res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err) next(err);
        req.flash("success","You are logged out! See you soon.");
        res.redirect("/listing");
    });
}