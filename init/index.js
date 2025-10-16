require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/users.js");
const mbxGeocoding = require("@maptiler/client"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY; 

mbxGeocoding.config.apiKey = MAPTILER_API_KEY;

main()
  .then(() => {
    console.log("connected to DB");
    console.log("Loaded MapTiler key:", process.env.MAPTILER_API_KEY);

  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});

  // Default user
  const defaultUser = new User({
    email: "vashu@example.com",
    username: "vashu"
  });
  const registeredUser = await User.register(defaultUser, "hello");
  const ownerId = registeredUser._id;


  for (let listingData of initData.data) {
    try {
      
      const geoData = await mbxGeocoding.geocoding.forward(listingData.location, { limit: 1 });
      
      if (geoData && geoData.features.length) {
        
        const newListing = new Listing({
          ...listingData,
          owner: ownerId,
          geometry: geoData.features[0].geometry 
        });
        
        
        await newListing.save();
      } else {
        console.log(`Could not find coordinates for: ${listingData.location}`);
      }
    } catch (err) {
      console.log(`Error geocoding ${listingData.location}:`, err.message);
    }
  }

  console.log("Data was initialized with geocoded locations!");
};

initDB();