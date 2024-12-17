const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Mongodb collection named here - will give lower case plural of name.

module.exports = mongoose.model("favorite", FavoriteSchema);