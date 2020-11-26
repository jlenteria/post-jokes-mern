const express = require('express'),
  bodyParser = require('body-parser'),
  User = require('./routes/api/userRoute'),
  Post = require('./routes/api/postRoute'),
  Profile = require('./routes/api/profileRoute'),
  morgan = require('morgan'),
  cors = require('cors'),
  passport = require('passport'),
  mongoDB = require('./db/mongoose'),
  fileUpload = require('express-fileupload');

mongoDB();

require('dotenv').config({
  path: './config/config.env',
});

const app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/api', User, Post, Profile);

const port = process.env.PORT;

app.listen(port, err => {
  console.log(`Server running at http://localhost:${port}`);
});
