const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    validate: {
      validator: function (value) {
        console.log("==", value);
        if (value.length == 0) {
          return false;
        }
        return true;
      },
      message: "provide at least 1 cast member",
    },
  },
  directors: {
    type: [String],
    validate: {
      validator: function (value) {
        if (value.length == 0) {
          return false;
        }
        return true;
      },
      message: "provide at least 1 director",
    },
  },
  fullplot: {
    type: String,
  },
  year: {
    type: Number,
  },
  isReleased: {
    type: Boolean,
  },
  rating: {
    type: Number,
  },
});

const MoviesModel = mongoose.model("movies", moviesSchema);
module.exports = MoviesModel;

//TODO:pull all the movies from the database and return them movies details and movies comments
