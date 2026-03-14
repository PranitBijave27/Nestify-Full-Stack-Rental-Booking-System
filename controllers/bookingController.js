const Listing=require("../models/listing");
const Booking = require("../models/booking");
const ExpressErr = require("../utils/ExpressErr");


module.exports.renderBookingForm=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new ExpressErr(400,"bad request");
    }
    const listing = await Listing.findById(id);
    if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listing");
}
    res.render("bookings/new.ejs",{listing});
}

 
module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body.booking;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    if (listing.owner.equals(req.user._id)) {
        req.flash("error", "You cannot book your own listing!");
        return res.redirect(`/listing/${id}`);
    }

    if (start < today) {
        req.flash("error", "You cannot book a date in the past.");
        return res.redirect(`/listing/${id}/bookings`);
    }
    if (end <= start) {
        req.flash("error", "Check-out must be at least one day after check-in.");
        return res.redirect(`/listing/${id}/bookings`);
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const existingBooking = await Booking.findOne({
        listing: id,
        $and: [
            {
                $or: [
                    { status: "confirmed" },
                    { status: "pending", createdAt: { $gt: fiveMinutesAgo } }
                ]
            },
            {
                checkIn: { $lt: end },
                checkOut: { $gt: start }
            }
        ]
    });

    if (existingBooking) {
        req.flash("error", "This Nest is already booked for the selected dates!");
        return res.redirect(`/listing/${id}/bookings`);
    }
    const nightCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = nightCount * listing.price;

    const newBooking = new Booking({
        ...req.body.booking,
        listing: id,
        guest: req.user._id,
        totalPrice,
        status: "pending"
    });

    await newBooking.save();
    req.flash("success", "Reservation confirmed!");
    res.redirect(`/listing/${id}`);
};