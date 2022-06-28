import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: [String],
  },
  { timestamps: true }
);

export default mongoose.model("PostMessage", postSchema);
