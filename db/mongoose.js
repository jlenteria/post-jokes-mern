const mongoose = require("mongoose");

const db = require("../config/key").MONGODB_URI;

const mongoDB = async () => {
  mongoose.connect(
    db,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => {
      console.log("Connected to Database");
    }
  );
};

module.exports = mongoDB;
