// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { createPost } from "./postApi";
// const initialState = {
//   posts: [],
// };

// // export const createPostAsync = createAsyncThunk(
// //   "post/createPost",
// //   async (post) => {
// //     const { data } = await createPost(post);
// //     return data;
// //   }
// // );
// export const postSlice = createSlice({
//   name: "post",
//   initialState,
//   reducers: {
//     CREATE: (state, action) => {
//       return {
//         ...state,
//         posts: [...state.posts, action.payload],
//       };
//     },
//   },
//   // extraReducers: (builder) => {
//   //   builder.addCase(createPostAsync.fulfilled, (state, action) => {
//   //     // console.log(state);
//   //     // console.log(action);
//   //     return {
//   //       ...state,
//   //       posts: [...state.posts, action.payload],
//   //     };
//   //   });
//   // },
// });

// export const { CREATE } = postSlice.actions;
// export const selectPost = (state) => state.post.posts;
// export default postSlice.reducer;
