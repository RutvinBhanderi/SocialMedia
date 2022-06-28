import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const updatePost = (newPost, id) => API.patch(`/posts/${id}`, newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const deletePost = (id) => API.delete(`/posts/${id}/deletepost`);
export const signup = (data) => API.post("user/signup", data);
export const signin = (data) => API.post("user/signin", data);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
