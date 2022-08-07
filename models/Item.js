const { Schema, model } = require("mongoose");
const itemsSchema = new Schema({
  name: {
    type: String,
  },
});
module.exports = model("Item", itemsSchema);
