import postMessage from "../models/post.js";

export const createPost = async (req, res) => {
  const post = req.body;
  console.log(req.userId);
  const newPost = new postMessage({ ...post, creator: req.userId });
  try {
    const result = await newPost.save();
    console.log(result.title);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  console.log(req.query);
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await postMessage.countDocuments();

    const posts = await postMessage
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    return res.status(200).json({
      data: posts,
      currentPage: page,
      totalNoOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};
export const fetchBySearch = async (req, res) => {
  console.log("object");
  const { searchQuery, tags } = req.query;
  console.log(searchQuery);
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await postMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  console.log(id);
  console.log("hello");
  try {
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    console.log(updatedPost.title);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
export const likePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === req.userId);
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== req.userId);
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    // console.log(updatedPost.likes);
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedPost = await postMessage.findByIdAndDelete(id);
    res.status(200).json({ message: "post deleted successfull" });
  } catch (error) {
    console.log(error);
  }
};
