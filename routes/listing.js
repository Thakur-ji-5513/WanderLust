const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing } = require("../utils/validate.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const Listingcontroller = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js"); 
const upload = multer({storage});

// Index route
router
  .route("/")
  .get(wrapAsync(Listingcontroller.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(Listingcontroller.createListing)
  );

// New route
router.get("/new", isLoggedIn, Listingcontroller.renderNewForm);

// Update route Delete route

router
  .route("/:id")
  .get(wrapAsync(Listingcontroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, // Also apply validation to the update route
    wrapAsync(Listingcontroller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(Listingcontroller.destroyListing));

// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(Listingcontroller.renderEditForm)
);

module.exports = router;
