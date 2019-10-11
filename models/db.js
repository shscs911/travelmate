const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shscs112:shscs112@kyc-fklxm.mongodb.net/TouristDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB Connection Successful");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./tourist.model");
