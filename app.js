require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const listRouter = require("./routes/list");
app.use(express.json());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// Error Handling
app.use("/:string", async (req, res) => {
  res.status(200).send("404 Page Not Found");
});
app.use("/", listRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
