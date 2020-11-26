const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  postJokesController,
  getJokesController,
  voteController,
  unVoteController,
  listOfJokes,
  updateJoke,
  deleteJoke,
  getTopJokes,
  getUserJokesController,
  getLatestJokes,
  filterUserJokesBySize,
} = require('../../controllers/postController');

router.get('/user/jokes', getJokesController);
router.post(
  '/user/joke',
  passport.authenticate('jwt', { session: false }),
  postJokesController
);
router.post(
  '/user/jokes/vote/:id',
  passport.authenticate('jwt', { session: false }),
  voteController
);
router.post(
  '/user/jokes/unvote/:id',
  passport.authenticate('jwt', { session: false }),
  unVoteController
);

router.get(
  '/user/jokes/list-of-jokes',
  passport.authenticate('jwt', { session: false }),
  listOfJokes
);

router.put(
  '/user/jokes/list-of-jokes/:id',
  passport.authenticate('jwt', { session: false }),
  updateJoke
);
router.delete(
  '/user/jokes/list-of-jokes/:id',
  passport.authenticate('jwt', { session: false }),
  deleteJoke
);

router.get('/user/joke/top-jokes', getTopJokes);
router.get('/user/profile-joke/:id', getUserJokesController);
router.get('/user/joke/latest-jokes', getLatestJokes);
router.get(
  '/user/jokes/likes-of-jokes/filtered',
  passport.authenticate('jwt', { session: false }),
  filterUserJokesBySize
);

module.exports = router;
