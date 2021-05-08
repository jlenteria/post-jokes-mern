const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addProfileController,
  deleteAccountController,
  addProfileLinksController,
  updateUserProfileController,
  addExperienceController,
  getProfileController,
  getUserProfile,
} = require("../../controllers/profileController");

router.post(
  "/updateBasicSettings",
  passport.authenticate("jwt", { session: false }),
  addProfileController
);

router.post(
  "/updateLinksSettings",
  passport.authenticate("jwt", { session: false }),
  addProfileLinksController
);

router.post(
  "/deleteAccount",
  passport.authenticate("jwt", { session: false }),
  deleteAccountController
);

router.post(
  "/updateUserSettings",
  passport.authenticate("jwt", { session: false }),
  updateUserProfileController
);

router.post(
  "/getCurrentProfile",
  passport.authenticate("jwt", { session: false }),
  getProfileController
);

router.post(
  "/getUserProfile/:id",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

module.exports = router;
