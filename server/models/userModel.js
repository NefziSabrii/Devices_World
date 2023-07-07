const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim : true,
    },
    telephone: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
