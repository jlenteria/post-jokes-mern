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
  const { firstName, lastName, email, password1 } = req.body;
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
            username: user.username,
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

exports.UpdatePasswordController = (req, res) => {
  var { oldPassword, newPassword } = req.body;

  User.findOne({ _id: req.user.id })
    .then((user) => {
      bcrypt.compare(oldPassword, user.password).then((isMatch) => {
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err2, hash) => {
              if (err2) {
                console.log(err2);
              }
              newPassword = hash;
              User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: { password: newPassword } }
              )
                .then(() => res.send({ StatusCode: 200, Message: "Success" }))
                .catch((ex) => res.send({ Message: ex.message }));
            });
          });
        } else {
          return res.send({
            StatusCode: 404,
            Message: "Password doesn't match to your account",
          });
        }
      });
    })
    .catch(() => res.send({ Message: "Error updating password" }));
};

exports.GetUserData = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({ Message: "Success", user });
    })
    .catch((err) => res.send({ Message: "No Data Found" }));
};

exports.updateCategory = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { category: req.params.category } }
  )
    .then(() => res.send({ Message: "Success" }))
    .catch((err) => res.send({ Message: err }));
};
