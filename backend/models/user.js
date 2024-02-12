const mongoose = require("mongoose");
const { MongooseFindByReference } = require("mongoose-find-by-reference");
const dayjs = require("dayjs");

const userSchema = new mongoose.Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    password: String,
    gender: String,
    role: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

const giftSchema = new mongoose.Schema(
  {
    gifts: {
      type: Array,
      default: [],
    },
    purpose: String,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    recipients: {
      type: Array,
      default: [],
    },
    via: String,
    dateAdded: {
      type: String,
      default: dayjs(Date.now()).format("DD/MM/YYYY"),
    },
  },
  { timestamps: true }
);

giftSchema.methods.findByGenderOrCountry = async (
  { filterA, filterB, limit, skip },
  next
) => {
  const docs = await this.UserModel.find(filterA);
  const query = {
    owner: { $in: docs.map((d) => d._id) },
    ...filterB,
  };
  const result = await this.GiftModel.find(query)
    .populate("owner", "-password")
    .limit(limit)
    .skip(skip)
    .sort({
      createdAt: -1,
    });
  const count = await this.GiftModel.countDocuments(query);
  return { result, count };
};

// giftSchema.plugin(MongooseFindByReference);
exports.UserModel = mongoose.model("users", userSchema);
// exports.GiftModel = mongoose.model("gifts", giftSchema);
