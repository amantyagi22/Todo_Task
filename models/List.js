const { Schema, model } = require("mongoose");

const listSchema = new Schema({
  name: {
    type: String,
  },
  items: {
    type: [Schema.Types.ObjectId],
    ref: "Item",
  },
});
module.exports = model("List", listSchema);
