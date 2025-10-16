const Listing = require("../models/listing");
const mbxGeocoding = require("@maptiler/client");
mbxGeocoding.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for, does not exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show", {
  listing,
  maptilerKey: process.env.MAPTILER_API_KEY
});
};



module.exports.createListing = async (req, res, next) => {
    try {
        const geoData = await mbxGeocoding.geocoding.forward(req.body.listing.location, { limit: 1 });

        if (!geoData.features || !geoData.features.length) {
            req.flash('error', 'Location not found. Please enter a valid location.');
            return res.redirect('/listings/new');
        }

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url: req.file.path, filename: req.file.filename };
        newListing.geometry = geoData.features[0].geometry;

        let savedListing = await newListing.save();
        console.log(savedListing);

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "Something went wrong while creating the listing.");
        res.redirect("/listings/new");
    }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for, does not exist");
    res.redirect("/listings");
  } else {
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/h_300/w_250");
    res.render("listings/edit.ejs", { listing,originalImage });
  }
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
  } 
  
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findOneAndDelete({ _id: id });
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
