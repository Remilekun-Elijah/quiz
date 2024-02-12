const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    name: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", categorySchema);
