const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  movie_Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now,
  },
});

commentsSchema.index({ email: 1, movie_Id: 1 }, { unique: true });

const CommentsModel = mongoose.model("comments", commentsSchema);
module.exports = CommentsModel;
