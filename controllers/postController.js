const Post = require("../models/Post");
const User = require("../models/User");

const validatePost = require("../validation/post");

exports.postJokesController = (req, res) => {
  const { validationText, isValid } = validatePost(req.body);
  if (!isValid) {
    return res.status(400).json(validationText.error);
  }

  Post.findOne({ text: req.body.text }).then((post) => {
    if (post) {
      validationText.error = "Joke is already posted";
      return res.status(400).json(validationText.error);
    }
    const newJoke = new Post({
      text: req.body.text,
      user: req.user.id,
    });

    newJoke
      .save()
      .then((post) => res.json(post))
      .catch((err) => console.log(err));
  });
};

exports.getJokesController = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((jokes) => {
      res.json(jokes);
    })
    .catch((err) => res.status(404).json({ notfound: "No posts" }));
};

exports.getTopJokes = (req, res) => {
  Post.aggregate(
    [
      {
        $project: {
          user: 1,
          text: 1,
          firstName: 1,
          lastName: 1,
          photo: 1,
          date: 1,
          vote: 1,
          title: 1,
          length: { $size: "$vote" },
        },
      },
      { $match: { length: { $gte: 2 } } },
      { $sort: { length: -1 } },
      { $limit: 20 },
    ],
    function (err, results) {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ notfound: "No posts" });
      }
    }
  );
};

exports.getLatestJokes = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .limit(10)
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(400).send(err));
};

exports.voteController = (req, res) => {
  User.findOne({ user: req.user.id }).then((user) => {
    Post.findById(req.params.id)
      .then((jokes) => {
        if (
          jokes.vote.filter((vote) => vote.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json("You have already voted");
        }

        //Add user id to vote array
        jokes.vote.unshift({ user: req.user.id });
        jokes.save().then((joke) => res.json(joke));
      })
      .catch((err) => res.status(404).json("Something went wrong!"));
  });
};

exports.unVoteController = (req, res) => {
  User.findOne({ user: req.user.id }).then((user) => {
    Post.findById(req.params.id).then((jokes) => {
      if (
        jokes.vote.filter((vote) => vote.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json("You have not yet voted this joke");
      }

      //get remove index
      const removeIndex = jokes.vote
        .map((item) => item.user.toString())
        .indexOf(req.user.id);
      jokes.vote.splice(removeIndex, 1);

      //save
      jokes.save().then((joke) => res.json(joke));
    });
  });
};

exports.getAllJokes = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((data) => res.send(data));
};

exports.listOfJokes = (req, res) => {
  User.findOne({ user: req.user.id })
    .then((user) => {
      Post.find({ user: req.user.id })
        .sort({ date: -1 })
        .then((jokes) => {
          res.status(200).json(jokes);
        })
        .catch((err) => {
          res.status(400).send("There is no data");
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.updateJoke = (req, res) => {
  const updates = Object.keys(req.body);
  const { validationText, isValid } = validatePost(req.body);

  if (!isValid) {
    return res.status(400).json(validationText.error);
  }

  User.findOne({ user: req.user.id }).then((user) => {
    Post.findById(req.params.id)
      .then((joke) => {
        if (!joke) {
          return res.status(404).send("Post not found");
        }
        Post.findOne({ text: req.body.text }).then((jokes) => {
          if (jokes) {
            validationText.error = "Post is duplicated";
            return res.status(400).json(validationText.error);
          }

          updates.forEach((update) => (joke[update] = req.body[update]));
          joke.save();
          res.json(joke);
        });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });
};

exports.deleteJoke = (req, res) => {
  User.findOne({ user: req.user.id }).then((user) => {
    Post.findById(req.params.id).then((joke) => {
      if (!joke) {
        return res.status(404).json("Post not found");
      }
      joke.remove().then(() => res.status(200).json("Successfully deleted"));
    });
  });
};

exports.getUserJokesController = (req, res) => {
  Post.find({ user: req.params.id })
    .sort({ date: -1 })
    .then((jokes) => {
      res.status(200).json(jokes);
    })
    .catch((err) => {
      res.status(404).json({ NotFound: "No found Jokes" });
    });
};

exports.filterUserJokesBySize = (req, res) => {
  Post.aggregate(
    [
      {
        $project: {
          user: 1,
          text: 1,
          firstName: 1,
          lastName: 1,
          photo: 1,
          date: 1,
          vote: 1,
          title: 1,
          length: { $size: "$vote" },
        },
      },
      { $match: { user: req.user.id } },
      { $sort: { length: -1 } },
    ],
    function (err, result) {
      console.log(result);
    }
  );
};

exports.getJokerLists = (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((joker) => {
      res.status(200).json(joker);
    })
    .catch((err) => {
      res.status(404).json({ NotFound: "No joker Lists" });
    });
};
