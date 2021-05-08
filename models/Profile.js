const mongoose = require("mongoose");

const profileScema = new mongoose.Schema({
  user: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
  },
  contactnumber: {
    type: Number,
  },
  gender: {
    type: String,
  },

  location: {
    type: String,
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
  },

  email: {
    type: String,
  },

  social: {
    github: {
      type: String,
    },
    website: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", profileScema);
