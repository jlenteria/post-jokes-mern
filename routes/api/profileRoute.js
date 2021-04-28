const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addProfileController,
  deleteAccountController,
  addProfileLinksController,
} = require("../../controllers/profileController");

router.post(
  "/addProfile",
  passport.authenticate("jwt", { session: false }),
  addProfileController
);

router.post(
  "/addProfileLinks",
  passport.authenticate("jwt", { session: false }),
  addProfileLinksController
);

router.post(
  "/deleteAccount",
  passport.authenticate("jwt", { session: false }),
  deleteAccountController
);

module.exports = router;
