const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema(
        {
          name:{
             type: String,
             required:[true, "please add category name"],
          },
        },
        {timestamps: true}
);

module.exports = mongoose.model("category", categorySchema)