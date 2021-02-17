const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const items = require("./routes/api/items");
const { patch } = require("./routes/api/items");

const users = require("./routes/api/users");

const auth = require("./routes/api/auth");

const app = express();

app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }) //this is a promise base
  .then(() => {
    console.log("Connected Successfully to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api/items", items);

app.use("/api/users", users);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(patch.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
