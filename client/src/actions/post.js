import * as api from "../api/index";

export const createPost = (post, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAll = (page) => async (dispatch) => {
  try {
    dispatch({ type: "START__LOADING" });
    const { data } = await api.getPosts(page);
    dispatch({ type: "FETCH__ALL", payload: data });
    dispatch({ type: "END__LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START__LOADING" });
    const { data } = await api.getPost(id);
    console.log(data);
    dispatch({ type: "FETCH__POST", payload: data });
    dispatch({ type: "END__LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const fetchPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    console.log(searchQuery);
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: "FETCH__BY__SEARCH", payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (newPost, id) => async (dispatch) => {
  try {
    console.log(newPost);
    const { data } = await api.updatePost(newPost, id);
    dispatch({ type: "UPDATE__POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: "LIKE__POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE__POST", payload: id });
  } catch (error) {
    console.log(error);
  }
};
