const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // link: {
  //   type: String,
  //   required: true,
  // },
  // duration: {
  //   type: Number,
  //   required: true,
  // },
  // track_postion: {
  //   type: Number,
  //   required: true,
  // },
  // rank: {
  //   type: Number,
  //   required: true,
  // },
  // release_date: {
  //   type: Date,
  //   required: true,
  // },
  // explicit_lyrics: {
  //   type: Boolean,
  //   required: true,
  // },
  // md5_image: {
  //   type: String,
  //   required: true,
  // },
  // artist: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Artist",
  //   required: true,
  // },
  // album: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Album",
  //   required: true,
  // },
});

module.exports = mongoose.model("Track", trackSchema);
