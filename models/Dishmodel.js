const mongoose = require("mongoose");
 
const dishSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dishName: {
      type: String,
      required: [true, "please add a dish name"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      required: [true, "please enter a description"],
    },
    price: {
      type: String,
      required: [true, "please enter a price"],
    },
    photo: {
      type: String,
      required: [true, "please enter a photo"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    ratedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Dish", dishSchema);