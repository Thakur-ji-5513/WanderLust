// Load .env from parent directory
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const Listing = require('../models/listing');
const mbxGeocoding = require("@maptiler/client");

// Rest of your code remains the same...
const dbUrl = process.env.ATLASDB_URL;
const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

mbxGeocoding.config.apiKey = MAPTILER_API_KEY;

async function migrateDatabase() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");

        const listingsWithoutGeometry = await Listing.find({
            $or: [
                { geometry: { $exists: false } },
                { geometry: null },
                { 'geometry.coordinates': { $exists: false } }
            ]
        });

        console.log(`Found ${listingsWithoutGeometry.length} listings to migrate`);

        for (let listing of listingsWithoutGeometry) {
            try {
                console.log(`Migrating: ${listing.title} - ${listing.location}`);
                
                const geoData = await mbxGeocoding.geocoding.forward(listing.location, { limit: 1 });
                
                if (geoData && geoData.features && geoData.features.length > 0) {
                    await Listing.findByIdAndUpdate(listing._id, {
                        $set: {
                            geometry: geoData.features[0].geometry,
                            confirmedLatitude: geoData.features[0].geometry.coordinates[1],
                            confirmedLongitude: geoData.features[0].geometry.coordinates[0],
                            formattedAddress: geoData.features[0].place_name || listing.location
                        }
                    });
                    console.log(`✅ Updated: ${listing.title}`);
                } else {
                    console.log(`❌ Could not geocode: ${listing.location}`);
                }
            } catch (error) {
                console.log(`❌ Error migrating ${listing.title}:`, error.message);
            }
        }

        console.log("Migration completed!");
        process.exit(0);

    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrateDatabase();