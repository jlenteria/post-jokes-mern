const User = require("../models/User");
const Profile = require("../models/Profile");
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
const validateImage = require("../validation/image");
const Post = require("../models/Post");
const { send } = require("@sendgrid/mail");

exports.addProfileController = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const {
        bio,
        gender,
        status,
        contactnumber,
        location,
        skills,
        birthdate,
      } = req.body;

      if (profile) {
        //Update profile
        const fields = {
          bio,
          gender,
          status,
          contactnumber,
          location,
          skills,
          birthdate,
          social: profile.social,
        };
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: fields })
          .then(() => res.json({ Message: "Success" }))
          .catch((err3) => res.status(400).json({ Message: err3.message }));
      } else {
        //Save Profile
        const fields = new Profile({
          user: req.user.id,
          bio,
          gender,
          status,
          contactnumber,
          location,
          skills,
          birthdate,
        });

        fields
          .save()
          .then((updatedProfile) => res.json(updatedProfile))
          .catch((err2) => res.status(400).json({ Message: err2.message }));
      }
    })
    .catch((err) => res.status(500).json({ Message: err.message }));
};

exports.addProfileLinksController = (req, res) => {
  const {
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    website,
    github,
  } = req.body;
  const social = {
    website,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    github,
  };

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        //update
        const fields = {
          bio: profile.bio,
          gender: profile.gender,
          status: profile.status,
          contactnumber: profile.contactnumber,
          location: profile.location,
          skills: profile.skills,
          birthdate: profile.birthdate,
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
          social,
        });
        fields
          .save()
          .then(() => res.json({ Message: "Links Successfully Saved" }));
      }
    })
    .catch((err) => res.send({ Message: err.message }));
};

exports.getProfileController = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => res.send(profile))
    .catch((err) => res.status(500).json({ Message: err.message }));
};

exports.getUserProfile = (req, res) => {
  Profile.findOne({ user: req.params.id })
    .then((profile) => res.send({ Message: "Success", profile: profile }))
    .catch((err) => res.send({ Message: "No data Found" }));
};

exports.deleteAccountController = (req, res) => {
  User.findOneAndDelete({ _id: req.user.id })
    .then((data) => {
      if (data) {
        Profile.findOneAndDelete({ user: req.user.id })
          .then(() =>
            Post.findOneAndDelete({ user: req.user.id }).then(() =>
              res.json({ Message: "User successfully deleted" })
            )
          )
          .catch((err2) => res.status(404).json({ Message: err2.message }));
      }
    })
    .catch((err) => res.status(500).json({ Message: err.message }));
};

exports.updateUserProfileController = (req, res) => {
  const { firstname, lastname, username, email } = req.body;
  Profile.find()
    .then((result) => {
      result.forEach((item) => {
        if (item.user !== req.user.id && item.username == username) {
          return res.send({
            StatusCode: 400,
            Message: "Username is already taken",
          });
        }
      });
      Profile.findOne({ user: req.user.id })
        .then((profile) => {
          if (profile) {
            let fields = {
              firstname: firstname,
              lastname: lastname,
              username: username,
              bio: profile.bio,
              gender: profile.gender,
              status: profile.status,
              contactnumber: profile.contactnumber,
              location: profile.location,
              skills: profile.skills,
              birthdate: profile.birthdate,
            };

            //Update
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: fields })
              .then(() => res.send({ StatusCode: 200, Message: "Success" }))
              .catch((err2) => res.send({ Message: err2.message }));
          } else {
            //save
            let fields = new Profile({
              user: req.user.id,
              firstname,
              lastname,
              username,
              bio: "",
              gender: "",
              status: "",
              contactnumber: "",
              location: "",
              skills: "",
              birthdate: "",
            });

            fields
              .save()
              .then(() => res.send({ StatusCode: 200, Message: "Success" }))
              .catch((err) => res.send({ Message: err.message }));
          }
          //Update
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { firstName: firstname, lastName: lastname, email: email } }
          )
            .then(() => {})
            .catch(() => {});
        })

        .catch((err) => {});
    })

    .catch((err2) => res.send({ Message: err2.message }));
};
