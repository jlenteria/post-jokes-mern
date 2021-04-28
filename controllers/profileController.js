const User = require("../models/User");
const Profile = require("../models/Profile");
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
const validateImage = require("../validation/image");
const Post = require("../models/Post");

exports.addProfileController = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const {
        Bio,
        Gender,
        Status,
        ContactNo,
        Location,
        Skills,
        BirthDate,
      } = req.body;
      if (profile) {
        //Update profile
        const fields = {
          firstname: req.user.firstName,
          lastname: req.user.lastName,
          bio: Bio,
          gender: Gender,
          status: Status,
          contactnumber: ContactNo,
          location: Location,
          skills: Skills,
          birthdate: BirthDate,
          experience: profile.experience,
          education: profile.education,
          social: profile.social,
        };
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: fields })
          .then(() => res.json({ Message: "Profile Updated Successfully" }))
          .catch((err3) => res.status(400).json({ Message: err3.message }));
      } else {
        //Save Profile
        const newProfile = new Profile({
          firstname: req.user.firstName,
          lastname: req.user.lastName,
          user: req.user.id,
          bio: Bio,
          gender: Gender,
          status: Status,
          contactnumber: ContactNo,
          location: Location,
          skills: Skills,
          birthdate: BirthDate,
          experience: [],
          education: [],
          social: {},
        });

        newProfile
          .save()
          .then((updatedProfile) => res.json(updatedProfile))
          .catch((err2) => res.status(400).json({ Message: err2.message }));
      }
    })
    .catch((err) => res.status(500).json({ Message: err.message }));
};

exports.addProfileLinksController = (req, res) => {
  const { youtube, twitter, facebook, linkedin, instagram } = req.body;
  const social = {
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  };

  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      //Save
      const fields = {
        bio: profile.Bio,
        gender: profile.Gender,
        status: profile.Status,
        contactnumber: profile.ContactNo,
        location: profile.Location,
        skills: profile.Skills,
        birthdate: profile.BirthDate,
        experience: profile.experience,
        education: profile.education,
        social,
      };

      Profile.findOneAndUpdate({ user: req.user.id }, { $set: fields })
        .then(() => res.json({ Message: "Links Successfully Updated" }))
        .catch((err) => res.status(400).send({ Message: err.message }));
    } else {
      const fields = new Profile({
        user: req.user.id,
        bio: "",
        gender: "",
        status: "",
        contactnumber: "",
        location: "",
        skills: "",
        birthdate: "",
        experience: [],
        education: [],
        social,
      });
      fields
        .save()
        .then(() => res.json({ Message: "Links Successfully Saved" }));
    }
  });
};

exports.getProfileController = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => res.send(profile))
    .catch((err) => res.status(500).json({ Message: err.message }));
};

exports.deleteAccountController = (req, res) => {
  User.findOneAndDelete({ _id: req.user.id })
    .then((data) => {
      if (data) {
        Profile.findOneAndDelete({ user: req.user.id })
          .then(() => res.json({ Message: "User successfully deleted" }))
          .catch((err2) => res.status(404).json({ Message: err2.message }));
      }
    })
    .catch((err) => res.status(500).json({ Message: err.message }));
};
