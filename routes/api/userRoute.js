const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  registerController,
  loginController,
  updateCategory,
  UpdatePasswordController,
  GetUserData,
} = require("../../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);

router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  UpdatePasswordController
);

router.get("/getUserData/:id", GetUserData);
router.post(
  "/updateCategory/:category",
  passport.authenticate("jwt", { session: false }),

  updateCategory
);

module.exports = router;
