const express = require("express");
const path = require("path");
const port = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => console.log(`app is running on port ${port}`));
