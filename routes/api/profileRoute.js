const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  postProfile,
  getProfile,
  postEducation,
  postExperience,
  deleteExperience,
  deleteEducation,
  getAllProfiles,
  getProfileById,
  getUserById,
  deleteAccount,
} = require('../../controllers/profileController');
router.post(
  '/user/profile',
  passport.authenticate('jwt', { session: false }),
  postProfile
);

router.get(
  '/user/profile',
  passport.authenticate('jwt', { session: false }),
  getProfile
);
router.get('/user/profile:/:id');
router.post(
  '/user/profile/experience',
  passport.authenticate('jwt', { session: false }),
  postExperience
);
router.post(
  '/user/profile/education',
  passport.authenticate('jwt', { session: false }),
  postEducation
);
router.delete(
  '/user/profile/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  deleteEducation
);
router.delete(
  '/user/profile/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  deleteExperience
);

router.get('/user/all-profile', getAllProfiles);
router.get('/user/profile/:id', getProfileById);
router.get('/user/:id', getUserById);

router.delete(
  '/user/delete',
  passport.authenticate('jwt', { session: false }),
  deleteAccount
);

module.exports = router;
