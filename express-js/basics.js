const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const MoviesModel = require("./models/movies");
const CommentsModel = require("./models/comments");
const port = process.env.PORT || 3000;

const app = express();
dotenv.config();

function startApp() {
  return Promise.resolve()
    .then(() => {
      //establish the db connection

      mongoose
        .connect(process.env.MONGO_URL, {})
        .then((connection) => {
          console.log(
            "Connected to MongoDB , DatabaseName :",
            connection.connection.db.databaseName
          );
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .then(() => {
      //establish middleware
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
    })
    .then(() => {
      //establish routes
      //greetings
      app.get("/greeting", (req, res) => {
        res.send("Hello, from server!");
      });

      //get movies
      app.get("/movies", (req, res) => {
        mongoose.connection
          .collection("movies")
          .find()
          .limit(10)
          .toArray()
          .then((movies) => {
            res.status(200).json(movies);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });

      //add movie
      app.post("/movies", (req, res) => {
        const movieObject = req.body;
        MoviesModel.create(movieObject)
          .then((movie) => {
            res.status(201).json(movie);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });

      //comments
      app.post("/comments", (req, res) => {
        const commentObject = req.body;
        CommentsModel.create(commentObject)
          .then((comment) => {
            res.status(201).json(comment);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });
    })
    .then(() => {
      //server listen
      app.listen(port, () => {
        console.log("Server is running on port " + port);
      });
    })
    .catch((error) => {
      console.log("Server error:", error);
      Promise.exit(1);
    });
}

startApp();
