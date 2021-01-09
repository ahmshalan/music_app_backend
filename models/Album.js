const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  track_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
  explicit_lyrics: {
    type: Boolean,
    required: true,
  },
  md5_image: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
});

module.exports = mongoose.model("Album", albumSchema);
