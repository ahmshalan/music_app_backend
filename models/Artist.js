const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  nb_album: {
    type: Number,
    required: true,
  },
  nb_fan: {
    type: Number,
    required: true,
  },
  tracklist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Artist", artistSchema);
