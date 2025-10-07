const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/users.js"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main()
  .then(() => {
    console.log("connected to DB");
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

  //default user
  const defaultUser = new User({
    email: "vashu@example.com",
    username: "vashu"
  });
  const registeredUser = await User.register(defaultUser, "hello");
  const ownerId = registeredUser._id;

  
  initData.data = initData.data.map((obj) => ({ ...obj, owner: ownerId }));

  
  await Listing.insertMany(initData.data);
  console.log("Data was initialized with a default owner!");
};

initDB();