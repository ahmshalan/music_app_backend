const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  favourite_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
  is_kid: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
