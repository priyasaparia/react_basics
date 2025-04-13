const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Notes = require("./models/notes");

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

  //get all notes
app.get("/", async (req, res) => {
  const notesList = await Notes.find();
  res.json(notesList);
});

// app.get("/notes", async (req, res) => {
//   const notesList = await Notes.find();
//   res.json(notesList);
// });

//get single note
app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.json(note);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//create note
app.post("/notes", async (req, res) => {
  const note = await Notes.create(req.body);
  res.json(note);
});

//update note
app.put("/notes/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json(updatedNote);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//delete note
app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await Notes.findByIdAndDelete(req.params.id);
    return res.json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//delete all notes
app.delete("/notes", async (req, res) => {
  try {
    await Notes.deleteMany({});
    return res.json({ message: "All notes deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//params
app.get("/users/:id/:name", (req, res) => {
  res.json({
    id: req.params.id,
    name: req.params.name,
  });
});

// app.post("/", (req, res) => {
//   res.send("this is a post request!");
// });

// app.put("/", (req, res) => {
//   res.send("this is a put request!");
// });

// app.delete("/", (req, res) => {
//   res.send("this is a delete request!");
// });

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
