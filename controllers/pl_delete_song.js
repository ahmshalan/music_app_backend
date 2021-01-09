const express = require("express");
const Playlist = require("../models/playlist");

// in case of router.post in the index/app file
module.exports = (req, res, next) => {
  const { username, playlistTitle, songId } = req.params;
  Playlist.findOneAndUpdate(
    { _username: username, "playlists.title": playlistTitle },
    { $pull: { "playlists.$.songs": { id: songId } } },
    { new: true, projection: { "playlists._id": false } }
  )
    .then((doc) => res.json(doc.playlists))
    .catch((err) => next(err));
};
