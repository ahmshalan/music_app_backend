const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
require("dotenv/config");

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const retrievePlaylist = require("./routes/Playlist/retrieve_playlist");
const createPlaylist = require("./routes/Playlist/create_playlist");
const deletePlaylist = require("./routes/Playlist/delete_playlist");
const PLaddSong = require("./routes/Playlist/pl_add_song");
const PLdeleteSong = require("./routes/Playlist/pl_delete_song");

//User Validation
const isValidUser = (req, res, next) => {
  if (req.currentUser.username !== req.params.username) {
    return res.status(401).send("You are not allowed to access this route");
  }
  return next();
};

// Playlist Routes
router.get("/:username/:title", isValidUser, retrievePlaylist);
router.post("/:username", isValidUser, createPlaylist);
router.delete("/:username/:playlistTitle", isValidUser, deletePlaylist);
router.put("/:username/:playlistTitle", isValidUser, PLaddSong);
router.delete("/:username/:playlistTitle/:songId", isValidUser, PLdeleteSong);

module.exports = router;

