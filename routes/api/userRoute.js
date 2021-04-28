const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  registerController,
  loginController,
  updateUserController,
  UpdatePasswordController,
} = require("../../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  UpdatePasswordController
);

module.exports = router;
