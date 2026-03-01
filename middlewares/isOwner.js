const Listing = require("../models/listing");
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listing/${id}`);
    }
    next();
};