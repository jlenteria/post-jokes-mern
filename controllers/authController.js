const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const sgMail = require("@sendgrid/mail");

const gravatar = require;

sgMail.setApiKey(process.env.MAIL_KEY);

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.registerController = (req, res) => {
  const { firstName, lastName, email, password1, photo, title } = req.body;
  const { validationText, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(validationText.error);
  }

  //fingind existing
  User.findOne({ email: email }).then((user) => {
    if (user) {
      validationText.error = "Email is taken";
      res.status(400).json(validationText.error);
    } else {
      //register
      // const avatar = gravatar.url(req.body.email, {
      //   s: '200', //Size
      //   r: 'pg', //Rating
      //   d: 'mm', //Default
      // });

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password1,
        // photo: avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err2, hash) => {
          if (err2) throw err2;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((err3) => res.status(400).json(err3));
        });
      });
    }
  });
};

exports.loginController = async (req, res) => {
  const { validationText, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(validationText.error);
  }
  const email = req.body.loginEmail;
  const password = req.body.loginPassword;

  try {
    //find user
    await User.findOne({ email }).then((user) => {
      if (!user) {
        validationText.error = "Email is not yet registered";
        return res.status(400).json(validationText.error);
      }
      //check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            photo: user.photo,
          };

          //sign token
          jwt.sign(
            payload,
            keys.secretKey,
            {
              expiresIn: "1hr",
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          validationText.error = "Incorrect password";
          res.status(400).json(validationText.error);
        }
      });
    });
  } catch (err) {
    res.status(400).json("Something went wrong!");
  }
};

exports.updateUserController = (req, res) => {
  const { Firstname, Lastname, Email, Password, Username } = req.body;
  // const { validationText, isValid } = validateUpdate(req.body);
  // if (!isValid) {
  //   return res.status(400).json(validationText.error);
  // }

  User.find()
    .then((result) => {
      result.forEach((item) => {
        if (item._id != req.user.id && item.username == Username) {
          return res.send({ Message: "Username is already taken" });
        }
        if (item._id != req.user.id && item.email == Email) {
          return res.send({ Message: "Email is already taken" });
        }
      });

      // Update User
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            firstName: Firstname,
            lastName: Lastname,
            email: Email,
            username: Username,
          },
        }
      )
        .then(() => res.json({ Message: "Success" }))
        .catch((err2) => console.log(err2.message));
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

exports.UpdatePasswordController = (req, res) => {
  const { Password } = req.body;
  User.findOneAndUpdate({ _id: req.user.id }, { password: Password })
    .then(() => res.json({ Message: "Password Successfully Updated" }))
    .catch(() => res.send({ Message: "Error updating password" }));
};
