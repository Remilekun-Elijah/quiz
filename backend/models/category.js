const mongoose = require("mongoose");
const { MongooseFindByReference } = require("mongoose-find-by-reference");
const dayjs = require("dayjs");

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
