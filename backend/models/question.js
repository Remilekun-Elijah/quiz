const dayjs = require("dayjs");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    difficulty: String,
    question: String,
    answers: {
      type: Array,
      default: [],
    },
    correctAnswer: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    correctCount: {
      type: Number,
      default: 0,
    },
    incorrectCount: {
      type: Number,
      default: 0,
    },
    dateAdded: {
      type: String,
      default: dayjs(Date.now()).format("DD/MM/YYYY"),
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("questions", questionSchema);
