const User = require('../models/User');
const Profile = require('../models/Profile');
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');
const validateImage = require('../validation/image');
const Post = require('../models/Post');

exports.postProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // // //GET FIELDS
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.birthdate || req.body.birthdate === '')
    profileFields.birthdate = req.body.birthdate;
  if (req.body.email || req.body.email === '')
    profileFields.email = req.body.email;
  if (req.body.username) profileFields.username = req.body.username;
  if (req.body.firstname) profileFields.firstname = req.body.firstname;
  if (req.body.lastname) profileFields.lastname = req.body.lastname;
  if (req.body.contactnumber || req.body.contactnumber === '')
    profileFields.contactnumber = req.body.contactnumber;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.location || req.body.location === '')
    profileFields.location = req.body.location;
  if (req.body.skills || req.body.location === '')
    profileFields.skills = req.body.skills;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.website || req.body.website === '')
    profileFields.website = req.body.website;
  if (req.body.bio || req.body.bio === '') profileFields.bio = req.body.bio;
  if (req.body.github || req.body.github === '') {
    profileFields.github = req.body.github;
  }
  //Social
  profileFields.social = {};
  if (req.body.youtube || req.body.youtube === '')
    profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter || req.body.twitter === '')
    profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook || req.body.facebook === '')
    profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin || req.body.linkedin === '')
    profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram || req.body.instagram === '')
    profileFields.social.instagram = req.body.instagram;
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //Update Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.status(200).json(profile));
      } else {
        //Add Profile
        Profile.findOne({ username: profileFields.username })
          .then(profile => {
            if (profile) {
              errors.username = 'Username already exists';
              res.status(400).json(errors);
            }
            //save Profile
            new Profile(profileFields)
              .save()
              .then(profile => res.status(201).json(profile));
          })
          .catch(err => res.status(400).json('err'));
      }
    })
    .catch(err => {
      return res.status(400).json({ NotFound: 'ERROR' });
    });
};

exports.getProfile = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json('There is no profile for this user yet!');
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
};

exports.postEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  const {
    location,
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        location,
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };

      //Add to edu array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(500).json(err));
};

exports.postExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  const { title, company, location, from, to, current, description } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };
      //Add to exp array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(500).json(err));
};

exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      //Splice out of Array
      profile.experience.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    })
    .catch(e => res.status(404).json(e));
};

exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item._id)
        .indexOf(req.params.edu_id);

      //Splice out of array
      profile.education.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(500).json(err));
};

exports.getAllProfiles = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => res.status(500).json(err));
};

exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(profile => {
      res.status(200).json(profile);
    })
    .catch(err => res.status(500).json(err));
};

exports.getProfileById = (req, res) => {
  Profile.findOne({ user: req.params.id })
    .then(profile => {
      res.status(200).json(profile);
    })
    .catch(err => res.status(500).json(err));
};

exports.deleteAccount = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      Post.find({ user: req.user.id }).then(post => {
        post.forEach(p => {
          p.remove();
        });
        res.status(200).send({ Success: true });
      });
    });
  });
};
