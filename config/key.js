if (process.env.NODE_ENV === "production") {
  module.exports = {
    MONGODB_URI: process.env.MONGO_URI,
    secretKey: process.env.SECRET_OR_KEY,
  };
} else {
  module.exports = {
    MONGODB_URI: "mongodb://localhost/JokesApp",
    secretKey: "bonfox98",
  };
}
