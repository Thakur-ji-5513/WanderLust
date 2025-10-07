#  WanderLust 🗺️✈️

WanderLust is a full-stack web application inspired by Airbnb. It allows users to browse, list, and review unique places to stay around the world! 🌎 This project is built using the MERN stack (MongoDB, Express.js, Node.js) and EJS for server-side rendering.

## Description 📝

This project is a personal milestone in my web development journey. It's an Airbnb clone where you can discover amazing new places, share your own, and leave reviews for fellow travelers. 🏠❤️

## Features ✨

* **User Authentication:** 🔐 Sign up, log in, and log out with secure password encryption.
* **Browse Listings:** 🖼️ View all available listings on an interactive and user-friendly homepage.
* **View Listing Details:** ℹ️ Get all the information you need about a listing, including a detailed description, price, location, and owner details.
* **CRUD Functionality:** ✏️ Authenticated users can create new listings, and owners can easily edit or delete their own properties.
* **Reviews and Ratings:** ⭐ Leave reviews and ratings for places you've visited to help other travelers make informed decisions.
* **Image Uploads:** 📸 Upload beautiful images of your listings, which are seamlessly stored on Cloudinary.

## Tech Stack 💻

* **Frontend:** EJS (Embedded JavaScript templates)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** Passport.js (local strategy)
* **Image Storage:** Cloudinary
* **Other Cool Packages:** `connect-flash`, `cookie-parser`, `dotenv`, `ejs-mate`, `express-session`, `joi`, `method-override`, `multer`.

## Getting Started 🚀

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites ✅

* Node.js
* npm
* MongoDB

### Installation 🛠️

1.  Clone the repository:
    ```sh
    git clone [https://github.com/your-username/WanderLust.git](https://github.com/your-username/WanderLust.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd WanderLust
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    MONGO_URL="mongodb://127.0.0.1:27017/wanderLust"
    CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    ```
5.  Start the server:
    ```sh
    node app.js
    ```
    The application will be running at `http://localhost:8080`. Happy coding! 🎉

## Future Scope 🔮 - currently the whole project is stil under development as i am actively working on adding the below features on my local machine but i will be providing a quick demo to it to showcase my work done up until now :)

* **Interactive Maps:** 🗺️ Implement maps for each listing using an API like Mapbox or Google Maps.
* **Advanced Filtering:** 🔍 Add filtering and sorting functionality to help users find the perfect place.
* **UI/UX Revamp:** ✨ Improve the user interface and experience to make it even more intuitive and visually appealing.
* **React Integration:** ⚛️ Integrate React for a more dynamic and modern frontend.
