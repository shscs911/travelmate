const mongoose = require("mongoose");

var touristSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required."
  },
  city: {
    type: String
  }
});

mongoose.model("Tourist", touristSchema);
