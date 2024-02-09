const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  nationality: {
    type: String,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("Users", userSchema);
