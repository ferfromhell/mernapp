const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  tittle: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  vote: {
    type: Number,
    default: 0,
    // require: true
  },
  by: {
    // type: Schema.Types.ObjectId,
    type: {},
    required: true,
    // ref: "User"
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  comments: {
    type: [],
    default: []
  },
  image: String,
  effect: String,
  draw: {}
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;