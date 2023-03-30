const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
    default:"https://dummyimage.com/600x400/000/fff"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "subcategory",
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  attachments: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("post", postSchema);
