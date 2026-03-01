const Listing=require("../models/listing");
const Booking = require("../models/booking");

module.exports.createBooking=async(req,res)=>{
    let { id }=req.params; //listing id
    let { checkIn, checkOut } = req.body.booking;
    const listing = await Listing.findById(id);

    const existingBooking = await Booking.findOne({
        listing: id,
        $or: [
            { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
        ]
    });

    if (existingBooking) {
        req.flash("error", "This Nest is already booked for the selected dates!");
        return res.redirect(`/listing/${id}`);
    }
    const diffInTime = new Date(checkOut) - new Date(checkIn);
    const nights = diffInTime / (1000 * 3600 * 24);

    if(nights<=0){
        req.flash("error","Check-out must be after Check-in!")
        return res.redirect(`/listing/${id}`);
    }
    
    const newBooking =new Booking({
        listing:id,
        guest:req.user._id,
        checkIn,
        checkOut,
        totalPrice:nights*listing.price
    });

    await newBooking.save();
    req.flash("success","Pack your bags! Booking confirmed.");
    res.redirect(`/listing/${id}`);
};
