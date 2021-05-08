const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    default: "Beginner",
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
  },
});

module.exports = User = mongoose.model("users", userSchema);
