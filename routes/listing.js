const express = require("express");
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing } = require("../utils/validate.js"); 
const Listing = require("../models/listing.js");

// Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      req.flash("error","Listing you requested for, does not exist");
      res.redirect("/listings");
    }
    else{
      res.render("listings/show.ejs", { listing });
    }
  })
);

// Create route with validation middleware
router.post(
  "/",
  validateListing, 
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
  })
);

// Edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error","Listing you requested for, does not exist");
      res.redirect("/listings");
    }
    else{
      res.render("listings/edit.ejs", { listing });
    }
  })
);

// Update route
router.put(
  "/:id",
  validateListing, // Also apply validation to the update route
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findOneAndDelete({ _id: id });
    req.flash("success","Listing Deleted!"); 
    res.redirect("/listings");
  })
);


module.exports = router;