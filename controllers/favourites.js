const User = require("../models/User");
const Track = require("../models/Track");

exports.postFavourite = (req, res) => {
  const trackId = req.params.trackId;
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      Track.findById(trackId).then((track) => {
        user.favourite_list.push(track);
        user.save();
        res.status(201).json({
          message: "Song appended successfully!",
          post: {
            title: track.title,
          },
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statuscode = 500;
      }
      next(err);
    });
};

exports.getFavourite = (req, res) => {
  const trackId = req.params.trackId;
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      Track.findById(trackId).then((track) => res.status(200).json(track));
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statuscode = 500;
      }
      next(err);
    });
};
