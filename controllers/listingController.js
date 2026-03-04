const Listing = require("../models/listing");
const { cloudinary }=require("../config/cloudConfig");

module.exports.index=async (req, res) => {
  const { search, category } = req.query;
  let query={};
  if (search) {
        query = {
            $or: [
                { location: { $regex: search, $options: "i" } },
                { title: { $regex: search, $options: "i" } }
            ]
        };
    }else if (category) {
        query = { category: category };
    }
    const allListings=await Listing.find(query).select("title image price location category");;
  res.render("index", { allListings,search:search ||category });
};

module.exports.renderNewForm= (req, res) => {
  res.render("newform");
}


module.exports.createListing=async (req, res, next) => {
    const data = req.body;
    const listingData = {
      title: data.title,
      description: data.description,
      price: data.price,
      location: data.location,
      country: data.country,
      category:data.category,
      owner:req.user._id,
    };
    if(req.file){
      listingData.image={
        url:req.file.path,
        filename:req.file.filename
      };
    };
    await Listing.create(listingData);
    req.flash("success", `Successfully created "${data.title}"!`);
    res.redirect("/listing");
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    let foundListing = await Listing.findById(id)
    .populate({ path:"reviews", populate:{ path:"author" }})
    .populate("owner");

    if (!foundListing) {
      req.flash("error", "The listing you are looking for does not exist!");
      return res.redirect("/listing");
    }

    const satisfiedCount = foundListing.reviews.filter(
      (r) => r.rating >= 3,
    ).length;
    const unsatisfiedCount = foundListing.reviews.filter(
      (r) => r.rating < 3,
    ).length;
    res.render("show", { foundListing ,showMap:true});
}


module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "The listing you are looking for does not exist!");
      return res.redirect("/listing");
    }
    let blurImage = listing.image.url.replace("/upload", "/upload/w_250,e_blur:200");
    res.render("editForm", { listing ,blurImage});
  }

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    Object.assign(listing,req.body.listing);

    if (typeof req.file !== "undefined") {

      if(listing.image && listing.image.filename){
          await cloudinary.uploader.destroy(listing.image.filename);
      }
      listing.image = { 
        url :req.file.path, 
        filename :req.file.filename,
      };
    }
    await listing.save();
    req.flash("success",`Successfully Updated Nest !`)
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;

    let listing=await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }

    if(listing.image && listing.image.filename){
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    await Listing.findByIdAndDelete(id);
    req.flash("success",`Successfully Deleted Nest !`)
    res.redirect("/listing");
  }