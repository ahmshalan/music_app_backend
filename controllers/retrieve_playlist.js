const express = require("express");
const Playlist = require("../models/playlist");

// in case of router.get in the index/app file
module.exports = (req, res, next) => {
  const { username, title } = req.params;
  Playlist.findOne(
    { _username: username, "playlists.title": title },
    { _id: false, "playlists._id": false }
  )
    .then((playlist) => res.json(playlist))
    .catch((err) => next(err));
};
