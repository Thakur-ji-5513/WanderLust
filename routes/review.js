const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview } = require("../utils/validate.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
// Post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);
// Delete review route
router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
