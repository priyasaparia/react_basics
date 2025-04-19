const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("mongodb");

const port = process.env.PORT || 3000;

const app = express();
dotenv.config();

const dbClient = new mongodb.MongoClient(process.env.MONGO_URL, {});
function startApp() {
  return Promise.resolve()
    .then(() => {
      //establish the db connection

      dbClient
        .connect()
        .then((connection) => {
          console.log(
            "Connected to MongoDB , DatabaseName :",
            connection.db.name
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
        dbClient
          .db("sample_mflix")
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
        dbClient
          .db("sample_mflix")
          .collection("movies")
          .insertOne(movieObject)
          .then((result) => {
            res.status(200).json(result);
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
