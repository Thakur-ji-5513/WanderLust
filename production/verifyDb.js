// Load .env from parent directory  
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
// Rest of your code...
const dbUrl = process.env.ATLASDB_URL;

async function verifyDatabase() {
    try {
        if (!dbUrl) {
            console.log("❌ ATLASDB_URL environment variable is not set");
            console.log("Please check your .env file");
            return;
        }

        console.log("🔗 Connecting to:", dbUrl.substring(0, 50) + "...");
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB");

        const Listing = require('../models/listing.js');
        
        const sampleListings = await Listing.find().limit(5);
        
        console.log("\n📊 Sample Listings Details:");
        sampleListings.forEach((listing, index) => {
            console.log(`\n${index + 1}. ${listing.title}`);
            console.log(`   Location: ${listing.location}`);
            console.log(`   Has Geometry: ${listing.geometry ? '✅' : '❌'}`);
            if (listing.geometry) {
                console.log(`   Coordinates: [${listing.geometry.coordinates[0]}, ${listing.geometry.coordinates[1]}]`);
            }
            console.log(`   Has Image: ${listing.image && listing.image.url ? '✅' : '❌'}`);
        });

        const totalListings = await Listing.countDocuments();
        const listingsWithGeometry = await Listing.countDocuments({ 
            'geometry.coordinates': { $exists: true } 
        });
        
        console.log(`\n📈 Summary:`);
        console.log(`   Total listings: ${totalListings}`);
        console.log(`   Listings with maps: ${listingsWithGeometry}`);
        console.log(`   Coverage: ${((listingsWithGeometry / totalListings) * 100).toFixed(1)}%`);

        mongoose.connection.close();
        console.log("\n✅ Database verification completed!");
        
    } catch (error) {
        console.error("❌ Database verification failed:", error.message);
    }
}

verifyDatabase();