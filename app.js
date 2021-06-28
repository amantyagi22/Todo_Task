//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//2. npm i mongoose
//3. require mongoose
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//4. create a new database inside mongodb
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//5. create a new schema
const itemsSchema = {
  name: String,
};
//6. create mongoose model based on the given schema
const Item = mongoose.model("Item", itemsSchema);
//1. remove all arrays
//7. create mongoose documents
const item1 = new Item({
  name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  //8. Reading from DB with mongoose
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  //Item entered by the user stored in itemName
  const itemName = req.body.newItem;
  //9. Add the item entered by the user
  const item = new Item({
    name: itemName,
  });
  item.save();
  //Now to reflect back to the page after adding
  //the new item
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
