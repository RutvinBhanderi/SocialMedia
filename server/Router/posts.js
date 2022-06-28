import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  likePost,
  deletePost,
  fetchBySearch,
  getPost,
} from "../controller/Post.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/search", fetchBySearch);
router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);

router.patch("/:id", auth, updatePost);

router.patch("/:id/likepost", auth, likePost);
router.delete("/:id/deletepost", auth, deletePost);
export default router;
