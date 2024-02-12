const express = require("express"),
  app = express();

const json2xls = require("json2xls"),
  cors = require("cors"),
  apiVersion = "/v1",
  route = require("./routes/index"),
  mongoose = require("mongoose"),
  config = require("./config/index");
require("./config/loadSeeds");

console.log(process.env.NODE_ENV);

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(cors("*"));

app.get("/", (req, res, next) => {
  res.json({
    name: "Giftshores Service",
    version: "1.0.0",
    success: true,
  });
});

app.use(json2xls.middleware);
app.use(apiVersion, route);

app.use("*", (req, res, next) => {
  res.status(404).json({
    success: true,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
    stack: err.stack,
  });
});

const connect = async (conString) => {
  console.info("Initiating MongoDB connection...");
  try {
    const conn = await mongoose.connect(conString);
    console.log(`MongoDB Connected: ${conn.connection.host} 🚀`);
  } catch (err) {
    console.log(err);
    console.error("Failed to connect to MongoDB Atlas.");
    process.exit(1);
  }
};

connect(config.dbUrl).then((con) => {
  const port = process.env.PORT || 9000;
  app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀`);
  });
});
