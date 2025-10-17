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
        const { location, latitude, longitude } = req.body.listing;
        
        console.log('Received location data:', { location, latitude, longitude });

        let geoData;
        
        // case1 - Use confirmed coordinates from the form if available
        if (latitude && longitude) {
            console.log('Using confirmed coordinates from form');
            geoData = {
                features: [{
                    geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    properties: {
                        place_name: location
                    }
                }]
            };
        } 
        // case2 - Fallback to geocoding the location text
        else if (location) {
            console.log('Falling back to geocoding location:', location);
            geoData = await mbxGeocoding.geocoding.forward(location, { limit: 1 });
        } 
        // case3 -  No location data at all
        else {
            req.flash('error', 'Location is required. Please select a location from suggestions.');
            return res.redirect('/listings/new');
        }

        // Validate we have coordinates
        if (!geoData.features || !geoData.features.length) {
            req.flash('error', 'Location not found. Please select a location from suggestions.');
            return res.redirect('/listings/new');
        }

        const coordinates = geoData.features[0].geometry.coordinates;
        console.log('Final coordinates:', coordinates);

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url: req.file.path, filename: req.file.filename };
        newListing.geometry = geoData.features[0].geometry;
        
        // Store enhanced location data
        newListing.confirmedLatitude = coordinates[1]; // latitude
        newListing.confirmedLongitude = coordinates[0]; // longitude
        newListing.formattedAddress = geoData.features[0].properties?.place_name || location;

        let savedListing = await newListing.save();
        console.log('Listing saved successfully:', savedListing._id);

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
    
    try {
        const { location, latitude, longitude } = req.body.listing;
        const listing = await Listing.findById(id);

        console.log('Updating listing with location data:', { location, latitude, longitude });

        let geoData;
        
        // Handle location updates with coordinates
        if (latitude && longitude) {
            console.log('Using confirmed coordinates for update');
            geoData = {
                features: [{
                    geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    properties: {
                        place_name: location
                    }
                }]
            };
        } else if (location && location !== listing.location) {
            // Only geocode if location actually changed
            console.log('Geocoding updated location:', location);
            geoData = await mbxGeocoding.geocoding.forward(location, { limit: 1 });
        }

        // Update geometry if we have new coordinates
        if (geoData && geoData.features && geoData.features.length) {
            listing.geometry = geoData.features[0].geometry;
            listing.confirmedLatitude = geoData.features[0].geometry.coordinates[1];
            listing.confirmedLongitude = geoData.features[0].geometry.coordinates[0];
            listing.formattedAddress = geoData.features[0].properties?.place_name || location;
        }

        // Update other fields
        listing.title = req.body.listing.title;
        listing.description = req.body.listing.description;
        listing.price = req.body.listing.price;
        listing.country = req.body.listing.country;
        listing.location = req.body.listing.location;

        // Handle image update if new file uploaded
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
        }

        await listing.save();
        console.log('Listing updated successfully');

        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Error updating listing:", err);
        req.flash("error", "Something went wrong while updating the listing.");
        res.redirect(`/listings/${id}/edit`);
    }
};
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findOneAndDelete({ _id: id });
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
