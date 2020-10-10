const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT;

app.listen(port, (err) => {
  console.log(`Server running at http://localhost:${port}`);
});
