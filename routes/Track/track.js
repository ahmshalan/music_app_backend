const express = require("express");

const trackController = require("../../controllers/track");

const router = express.Router();

// GET /feed/posts
router.get("/:trackID", trackController.getTrack);
router.post("/", trackController.postTrack);

// router.post("/favourite/:userId/:trackId", trackController.postFavourite);

module.exports = router;
